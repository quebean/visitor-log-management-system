const Visit = require('../models/visit');
const OfficeLog = require('../models/officeLog');
const jwt = require('../middlewares/authentication');

const {formatDateString} = require('../utl/dateFormat');

module.exports.visitSearch = async (req, res) => {
    const {string, category} = req.body;
    try {
        const visits = await Visit.search(string, category);
        res.status(200).json(visits);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Failed'})
    }
}

module.exports.visitCreate = async (req, res) => {
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

module.exports.visitUpdateTimeOut = async (req, res) => {
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

module.exports.visitShow = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);
        const officeLogs = await OfficeLog.findByVisitId(req.params.id);
        res.status(200).render('admin/visit-details', {
            visit,
            officeLogs
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: 'Bad request'});
    }
}