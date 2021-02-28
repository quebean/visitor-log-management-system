const db = require('../config/database');

module.exports = class Office {
    constructor(officeName, incharge) {
        this.officeName = officeName;
        this.incharge = incharge;
        this.id = 0;
    }

    static async search(string, category){
        let sql = '';
        string = `%${string}%`;
        if (!string || !category) {
            sql = 'SELECT offices.office_id, offices.office_name, offices.incharge, users.username FROM offices INNER JOIN users ON users.user_id = offices.user_id';
            string = '';
        }else if(category == 'officeName'){
            sql = 'SELECT offices.office_id, offices.office_name, offices.incharge, users.username FROM offices INNER JOIN users ON users.user_id = offices.user_id WHERE offices.office_name LIKE ?';
        }else if(category == 'incharge'){
            sql = 'SELECT offices.office_id, offices.office_name, offices.incharge, users.username FROM offices INNER JOIN users ON users.user_id = offices.user_id WHERE offices.incharge LIKE ?';
        }
        const result = await db.promise().query(sql, [string]);
        return result[0];
    }

    static async findById(id){
        const sql = 'SELECT * FROM offices INNER JOIN users ON users.user_id = offices.user_id WHERE office_id = ?';
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }   

    static async findUserById(id){
        const sql = 'SELECT * FROM offices INNER JOIN users ON offices.user_id = users.user_id WHERE offices.user_id = ?';
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }
    
    static async create(office){
        const sql = "INSERT INTO offices (office_name, incharge, user_id) VALUES (?, ?, ?)";
        const params = [office.officeName, office.incharge, office.id];
        const result = await db.promise().query(sql, params);
        return result[0].insertId;
    }

    static async updateById(office_id, office, username){
        const sql = 'UPDATE offices INNER JOIN users ON users.user_id = offices.user_id SET offices.office_name = ?, offices.incharge = ?, users.username = ? WHERE office_id = ?';
        const params = [office.officeName, office.incharge, username, office_id];
        const result = await db.promise().query(sql, params);
        return result;
    }

    static async deleteById(id){
        const sql = "DELETE FROM offices WHERE office_id = ?"
        const result = await db.promise().query(sql, [id]);
        return result;
    }
}