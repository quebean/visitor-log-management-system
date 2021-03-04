const express = require('express');
const router = express.Router();

const {officeScanner} = require('../controllers/officeController');

const {officeLogCreate} = require('../controllers/officeLogController');

router.get('/scanner', officeScanner);
router.post('/officelog', officeLogCreate);
module.exports = router;