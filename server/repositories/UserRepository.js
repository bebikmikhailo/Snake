const db = require('../database.js');

class UserRepository {
    async createUser(user) {
        const connection = await db.getConnection();
        
        try {
            await connection.beginTransaction();

            const [userResult] = await connection.query(`
                INSERT INTO users (user_name, email, password_hash) VALUES (?, ?, ?)
            `, [user.username, user.email, user.password]);

            const newUserId = userResult.insertId;

            await connection.query(`
                INSERT INTO statistics (user_id) VALUES (?)
            `, [newUserId]);

            await connection.commit();
            return userResult;

        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    async getUserByEmail(email) {
        try {
            const result = await db.query(`
            SELECT * FROM users WHERE email = ?
            `, [email]);

            return result[0][0];

        } catch (err) {
            throw  err;
        }
    }

    async getUserBestScoreById(id) {
        try {
            const result = await db.query(`
                SELECT best_score FROM statistics
                WHERE user_id = ?
            `, [id]);

            return result[0][0].best_score;
        } catch(err) {
            throw err;
        }
    }

    async setUserBestScoreById(id, bestScore) {
        try {
            await db.query(`
                UPDATE statistics 
                SET best_score = ? 
                WHERE user_id = ? AND best_score < ?
            `, [bestScore, id, bestScore]);
        } catch(err) {
            throw err;
        }
    }
}

module.exports = new UserRepository();