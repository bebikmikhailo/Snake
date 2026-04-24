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
}

module.exports = new UserRepository();