const express = require('express');
const router = express.Router();

const {office_scanner} = require('../controllers/officeController');

const {officeLogPost} = require('../controllers/officeLogController');

router.get('/scanner', office_scanner);
router.post('/log', officeLogPost);
module.exports = router;