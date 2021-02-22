const express = require('express');
const router = express.Router();

const {office_scanner} = require('../controllers/officeController');

router.get('/scanner', office_scanner);

module.exports = router;