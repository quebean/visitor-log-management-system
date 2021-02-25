const db = require('../config/database');

module.exports = class Office {
    constructor(officeName, incharge) {
        this.officeName = officeName;
        this.incharge = incharge;
        this.id = 0;
    }

    static async find(string, category){
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
        const sql = 'SELECT * FROM offices WHERE user_id = ?';
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }

    static async findByUserId(id){
        const sql = 'SELECT offices.office_name FROM offices INNER JOIN users ON offices.user_id = users.user_id WHERE offices.user_id = ?';
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }

    static async updateById(id, office){
        const sql = 'UPDATE offices SET office_name = ?, incharge = ? WHERE office_id = ?';
        const params = [office.officeName, office.incharge, id];
        const result = await db.promise().query(sql, params);
        return result;
    }

    static async create(office){
        const sql = "INSERT INTO offices (office_name, incharge, user_id) VALUES (?, ?, ?)";
        const params = [office.officeName, office.incharge, office.id];
        const result = await db.promise().query(sql, params);
        return result[0].insertId;
    }
}