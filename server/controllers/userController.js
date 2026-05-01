require("dotenv").config();

const userRepo = require("../repositories/UserRepository.js");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token"});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY); 
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT Error:", err.message);
        return res.status(403).json({ message: "Token is invalid" });
    }

};

exports.getBestScore = async (req, res) => {
    try {
        const bestScore = await userRepo.getUserBestScoreById(req.user.id);
        res.status(200).json({ bestScore });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server"});
    }
};

exports.setBestScore = async (req, res) => {
    try {
        await userRepo.setUserBestScoreById(req.user.id, req.body.bestScore);
        const bestScore = req.body.bestScore;
        res.status(200).json({ bestScore });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server"});
    }
}

exports.getStatistic = async (req, res) => {
    try {
        const statistic = await userRepo.getUserStatisticById(req.user.id);
        res.status(200).json({ statistic });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server" });
    }
}

exports.saveStatistic = async (req, res) => {
    try {
        await userRepo.saveUserStatistic(req.user.id, req.body.data);
        res.status(200);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server" });
    }
}

exports.getBestPlayersByScore = async (req, res) => {
    try {
        const players = await userRepo.getBestPlayersByScore(req.query.number);
        res.status(200).json({ players });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server" });
    }
}