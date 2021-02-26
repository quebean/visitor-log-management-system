const Visit = require('../models/visit');
const jwt = require('../middlewares/authentication');

const {formatDateString} = require('../utl/dateFormat');

module.exports.visit_post = async (req, res) => {
    const {string, category} = req.body;
    try {
        const visits = await Visit.find(string, category);
        res.status(200).json({visits: visits});
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Failed'})
    }
}

module.exports.form_post = async (req, res) => {
    const visit = new Visit(
        req.body.name,
        req.body.address,
        req.body.contactNumber,
        req.body.purpose
    );
    try {
        const result = await Visit.create(visit);
        const token = jwt.createToken(result)
        res.cookie('visitId', token, {httpOnly: true, maxAge: 1000 * 60 * 3})
        res.redirect('/survey');
    } catch (error) {
        console.log(error);
        res.status(400);
    }
}

module.exports.scanner_post = async (req, res) => {
    const date = `${formatDateString(new Date)} ${new Date().toLocaleTimeString()}`;
    const id = req.body.id;
    try {
        const result = await Visit.updateTimeOut(date, id);
        res.status(200).json({message: 'Success'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Failed'});
    }
} 