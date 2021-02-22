const Covid = require('../models/covid');


module.exports.covid = async (req, res) => {
    const {string, category} = req.body;
    try {
        const result = await Covid.find(string, category);
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