require("dotenv").config();

const bcrypt = require("bcrypt");
const userRepo = require("../repositories/UserRepository.js");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;


exports.createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
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
            return res.status(400).json({ message: `${field} is already taken. Please try another one`});
        }

        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server"});
    }
};

exports.authorizeUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.getUserByEmail(email);

        if (!user) {
            res.status(401).json({ message: "User with this email not found"})
            
        } else {

            const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    
            if (isPasswordMatch) {

                const token = jwt.sign(
                    { id: user.id, userName: user.user_name },
                    SECRET_KEY,
                    { expiresIn: "1d" }
                )

                res.status(200).json({
                    message: "User has successfully authorized!",
                    token: token
                });

            } else {
                res.status(401).json({ message: "Password is wrong!"})
            }
            
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server."});
    }
}

async function hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}