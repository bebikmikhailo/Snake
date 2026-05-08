const multer = require("multer");

const userRepo = require("../repositories/UserRepository.js");
const fs = require('fs').promises;
const path = require('path');
const utils = require("../utils.js");

exports.authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "No token"});
    }

    try {
        const decoded = utils.decodeJWT(token);
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

exports.getAvatar = async (req, res) => {
    try {
        const avatar = await userRepo.getAvatar(req.user.id);
        res.status(200).json(avatar);
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

exports.saveUsername = async (req, res) => {
    try {
        await userRepo.saveUsername(req.user.id, req.body.data);

        const token = utils.createJWTWithoutExpiresIn(req.user.id, req.body.data, req.user.exp);

        res.status(200).json({ token });
    } catch(err) {

        if (err.errno === 1062) {
            const field = err.sqlMessage.includes("user_name") ? "Username" : "";
            return res.status(400).json({ message: `${field} is already taken. Please try another one`});
        }

        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server" });
    }
}

exports.saveAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file' });
        }

        const filePath = `/uploads/avatars/${req.file.filename}`;
        const userId = req.user.id;
        const oldAvatarPath = (await userRepo.getAvatar(userId)).user_avatar; 

        await userRepo.saveAvatar(userId, filePath);

        if (oldAvatarPath) {
            const fullPath = path.join(__dirname, '..', oldAvatarPath); 

            try {
                if (!oldAvatarPath.includes('default-avatar')) {
                    await fs.unlink(fullPath);
                }
            } catch (fileErr) {
                console.log("Cannot delete file:", fileErr.message);
            }
        }

        res.status(200).json({ user_avatar: filePath });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong on the server" });
    }
}