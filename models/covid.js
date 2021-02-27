const db = require('../config/database');

module.exports = class Covid {
    constructor(temperature, age, sex, fever, cough, colds, shortnessOfBreath, diarrhea, otherSymptoms, travel, location, closeContact, careWOPPE, closeENV, travelTogether, agree, visitId){
        this.temperature = temperature;
        this.age = age;
        this.sex = sex;
        this.fever = fever;
        this.cough = cough;
        this.colds = colds;
        this.shortnessOfBreath =  shortnessOfBreath;
        this.diarrhea = diarrhea;
        this.otherSymptoms = otherSymptoms;
        this.travel = travel;
        this.location = location;
        this.closeContact = closeContact;
        this.careWOPPE = careWOPPE;
        this.closeENV = closeENV;
        this.travelTogether = travelTogether;
        this.agree = agree;
        this.visitId = visitId;
    }

    static async search(string, category){
        let sql = '';
        string = `%${string}%`;
        if (category == 'fullname') {
            sql = `SELECT * FROM visits INNER JOIN covid ON visits.visit_id = covid.visit_id WHERE visits.fullname LIKE ?`;
        }else if (category == 'timein') {
            sql = `SELECT * FROM covid INNER JOIN visits ON visits.visit_id = covid.visit_id WHERE visits.timein LIKE ?`; 
        }
        const result = await db.promise().query(sql, [string]);
        return result[0];
    }

    static async findByVisitId(id){
        const sql = 'SELECT * FROM covid WHERE visit_id = ?';
        const result = await db.promise().query(sql, [id]);
        return result[0][0];
    }

    static async create(covid){
        const sql = 'INSERT INTO covid (temperature, age, sex, fever, cough, colds, shortness_of_breath, diarrhea, other_symptoms, travel, location, close_contact, care_woppe, close_env, travel_together, agree, visit_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [covid.temperature, covid.age, covid.sex, covid.fever, covid.cough, covid.colds, covid.shortnessOfBreath, covid.diarrhea, covid.otherSymptoms, covid.travel, covid.location, covid.closeContact, covid.careWOPPE, covid.closeENV, covid.travelTogether, covid.agree, covid.visitId];
        const result = await db.promise().query(sql, params);
        return result[0].insertId;
    }
}