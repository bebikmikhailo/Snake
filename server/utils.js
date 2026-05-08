require("dotenv").config();

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.createJWT = (id, userName, expiresIn) => {

    const token = jwt.sign(
        { id, userName },
        SECRET_KEY,
        { expiresIn }
    )

    return token;
}

exports.createJWTWithoutExpiresIn = (id, userName, exp) => {
    const token = jwt.sign(
        { id, userName, exp },
        SECRET_KEY
    )

    return token;
}

exports.decodeJWT = (token) => {
    return jwt.verify(token, SECRET_KEY); 
}