const db = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = class User{
    constructor(username, password, role){
        this.username = username;
        this.password = password;
        this.role = role;
    }

    static async findById(id){
        const sql = "SELECT * FROM users WHERE user_id = ?";
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }

    static async findByUsername(username){
        const sql = "SELECT * FROM users WHERE username = ?";
        const result = await db.promise().query(sql, [username]);
        return result[0][0];
    }

    static async updateById(id, user){
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        const sql = "UPDATE users SET username = ?, password = ?, role = ? WHERE user_id = ?";
        const params = [user.username, user.password, user.role, id];
        const result = await db.promise().query(sql, params);
        return result;
    }

    static async create(user){
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt)
        const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)'
        const params = [user.username, user.password, user.role];
        const result = await db.promise().query(sql, params);
        return result[0].insertId; 
    }

    static login(username, password){
        return new Promise(async (resolve, reject) => {
            const result = await this.findByUsername(username);
            if(result) {
                const auth = await bcrypt.compare(password, result.password);
                if(auth){
                    resolve(result);
                }else{
                    reject('The password you entered is incorrect. Please try again.');
                }
            }else{
                reject('The username and password you entered is incorrect. Please try again.');
            }
        });
    }
}