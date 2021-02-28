const { off } = require('../config/database');
const { findById } = require('../models/office');
const Office = require('../models/office');
const User = require('../models/user');

module.exports.office = async (req, res) => {
    try {
        const offices = await Office.search(req.body.search, req.body.category);
        res.status(200).json({success: true, offices});
    } catch (error) {
        console.log(erorr);
        res.status(500).json({success: false});
    }
}

module.exports.create_office_post = async (req, res) => {
    const user = new User(
        req.body.username,
        req.body.password,
        'basic'
    ) 
    const office = new Office(
        req.body.officeName,
        req.body.incharge,
    )
    try {
        const userResult = await User.create(user);
        office.id = userResult;
        const officeResult = await Office.create(office);
        res.status(200).json({success: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false});
    }
}

module.exports.office_edit = async (req, res) => {
    try {
        const office = await Office.findById(req.params.id);
        res.status(200).render('admin/edit-office', {office});
    } catch (error) {
        console.log(error);
    }
}

module.exports.office_put = async (req, res) => {
    const office = new Office(
        req.body.officeName,
        req.body.incharge
    )
    try {
        const result = await Office.updateById(req.params.id, office, req.body.username);
        res.status(200).json({success: true}); 
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false});
    }
}

module.exports.office_scanner = async (req, res) => {
    try {
        const result = await Office.findUserById(req.user.user_id);
        res.status(200).render('officeScanner', {result});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Database error'});
    }
}