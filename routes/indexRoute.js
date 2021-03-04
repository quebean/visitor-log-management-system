const express = require('express');
const router = express.Router();
const {visitCreate} = require('../controllers/visitController');
const {covidCreate} = require('../controllers/covidController');
const {validateVisit, validateCovid} = require('../middlewares/validateBody');
const {verifyVisitId} = require('../middlewares/authentication');

router.get('/', (req, res) => res.render('form'));
router.post('/form', [validateVisit], visitCreate);
router.get('/survey', (req, res) => res.render('survey'));
router.post('/survey', [verifyVisitId, validateCovid], covidCreate);
router.get('/qrcode', (req, res) => res.render('qrcode'));
router.get('/officeScanner', (req, res) => res.render('officeScanner'));

module.exports = router;