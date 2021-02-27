const Covid = require('../models/covid');
const Visit = require('../models/visit');
const OfficeLog = require('../models/officeLog');

module.exports.covid = async (req, res) => {
    const {string, category} = req.body;
    try {
        const result = await Covid.search(string, category);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
} 

module.exports.survey_post = async (req, res) => {
    const id = req.visitId;
    if (id) {
        const covid = new Covid(
            req.body.temperature,
            req.body.age,
            req.body.sex,
            req.body.fever,
            req.body.cough,
            req.body.colds,
            req.body.shortnessOfBreath,
            req.body.diarrhea,
            req.body.otherSymptoms,
            req.body.travel,
            req.body.location,
            req.body.closeContact,
            req.body.careWOPPE,
            req.body.closeENV,
            req.body.travelTogether,
            req.body.agree,
            id
        )
        try {
            const result = await Covid.create(covid);
            res.cookie('visitIdCookie', id, {maxAge: 1000 * 60 * 10});
            res.redirect('qrcode');
        } catch (error) {
            console.log(error);
            res.redirect('/form')
        }
    }else{
        res.redirect('/form')
    }
}

module.exports.covid_show = async (req, res) => {
    const id = req.params.id
    try {
        const visit = await Visit.findById(id);
        const covid = await Covid.findByVisitId(id);
        const officeLogs = await OfficeLog.findByVisitId(id);
        res.status(200).render('admin/covid-details', {
            visit,
            covid,
            officeLogs
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: 'Bad Request'});
    }
}