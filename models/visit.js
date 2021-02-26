const db = require('../config/database');
const {formatDateString} = require('../utl/dateFormat');

module.exports = class Visit{
    constructor(name, address, contactNumber, purpose) {
        this.name = name;
        this.address = address;
        this.contactNumber = contactNumber;
        this.purpose = purpose;
        this.timeIn = `${formatDateString(new Date)} ${new Date().toLocaleTimeString()}`;
        this.timeOut = null;
    }

    static async find(string, category){
        console.log(string, category);
        let sql = '';
        if (category == 'fullname') {
            sql = `SELECT * FROM visits WHERE fullname LIKE ?;`;
            if (string) {
                string = `%${string}%`;
            }
        } else if (category == 'timein'){
            sql = `SELECT * FROM visits WHERE timein LIKE ?;`;
            string = `%${string}%`;
        } 
        const result = await db.promise().query(sql, [string]);
        return result[0];
    }

    static async findById(id){
        const sql = 'SELECT * FROM visits WHERE visit_id = ?';
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }

    static async create(visit){
        const sql = 'INSERT INTO visits (fullname, address, contact_number, purpose, timein, timeout) VALUES (?, ?, ?, ?, ?, ?)';
        const params = [visit.name, visit.address, visit.contactNumber, visit.purpose, visit.timeIn, visit.timeOut];
        const result = await db.promise().query(sql, params);
        return result[0].insertId;
    }

    static async updateTimeOut(date, id){
        const sql = 'UPDATE visits SET timeout = ? WHERE visit_id = ?';
        const params = [date, id];
        const result = await db.promise().query(sql, params);
        return result[0];
    }
}