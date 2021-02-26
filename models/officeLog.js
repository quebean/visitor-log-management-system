const db = require('../config/database');
const {formatDateString} = require('../utl/dateFormat');

module.exports = class OfficeLog{
    constructor(visitId, officeId) {
        this.visitId = visitId,
        this.officeId = officeId
        this.timestamp = `${formatDateString(new Date)} ${new Date().toLocaleTimeString()}`;
    }

    static async findById(id){
        const sql = 'SELECT * FROM office_log WHERE office_log_id = ?';
        const result = await db.promise.query(sql, [id]);
        return result[0][0];
    }

    static async create(officeLog){
        console.log(officeLog);
        const sql = "INSERT INTO office_log (visit_id, office_id, timestamp) VALUES (?, ?, ?)";
        const params = [officeLog.visitId, officeLog.officeId, officeLog.timestamp];
        const result = await db.promise().query(sql, params);
        return result[0].insertId;
    }
}