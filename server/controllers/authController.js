const bcrypt = require("bcrypt");
const userRepo = require("../repositories/UserRepository.js");


exports.createUser = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashedPassword = await hashPassword(password);

        const result = await userRepo.createUser({
            email,
            username,
            password: hashedPassword
        })

        res.status(201).json({ message: "User has been registered!"})
    } catch(err) {
        if (err.errno === 1062) {
            const field = err.sqlMessage.includes("user_name") ? "Username" : "Email";
            return res.status(400).json({ message: `${field} is already taken. Please try another one.`});
        }

        console.log(err);
        res.status(500).json({ error: "Something went wrong on the server."});
    }
};

async function hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}