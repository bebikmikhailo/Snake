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

    async get(query, params) {
        try {

            const result = await db.query(query, params);
            return result[0][0];

        } catch (err) {
            throw  err;
        }
    }

    async getWithoutUnpack(query, params) {
        try {

            const result = await db.query(query, params);
            return result[0];

        } catch (err) {
            throw  err;
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.get("SELECT * FROM users WHERE email = ?", [email]);
        } catch(err) {
            throw err;
        }
    }

    async getUserBestScoreById(id) {
        try {

            return (await this.get(`
                SELECT best_score FROM statistics
                WHERE user_id = ?
            `, [id])).best_score;

        } catch(err) {
            throw err;
        }
    }

    async getUserStatisticById(id) {
        try {

            return await this.get(`
                SELECT games_count, total_eaten_food_count, best_score, last_game_at FROM statistics
                WHERE user_id = ?`, [id]);
                
        } catch(err) {
            throw err;
        }
    }

    async getBestPlayersByScore(number) {
        try {

            return await this.getWithoutUnpack(`
                SELECT t1.user_name, s.best_score
                FROM statistics s
                LEFT JOIN users t1 ON s.user_id = t1.id
                ORDER BY s.best_score DESC
                LIMIT ?;
            `, [Number(number)]);
        } catch(err) {
            throw err;
        }
    }


    async save(query, params) {
        try {
            await db.query(query, params);
        } catch(err) {
            throw err;
        }
    }

    async saveUserStatistic(id, user) {
        try {
            await this.save(`
                UPDATE statistics
                SET games_count = ?,
                total_eaten_food_count = ?,
                best_score = ?
                WHERE user_id = ?
            `, [user.games_count, user.total_eaten_food_count, user.best_score, id]);

        } catch(err) {
            throw err;
        }
    }
}

module.exports = new UserRepository();