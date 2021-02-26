const OfficeLog = require('../models/officeLog');
const Office = require('../models/office');

module.exports.officeLogPost = async (req, res) => {
    const officeLog = new OfficeLog();
    try {
        const officeResult = await Office.findByUserId(req.user.user_id);
        officeLog.officeId = officeResult.office_id;
        officeLog.visitId = req.body.id;
        const result = await OfficeLog.create(officeLog);
        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
}