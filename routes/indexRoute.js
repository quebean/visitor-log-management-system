const express = require('express');
const router = express.Router();
const {form_post} = require('../controllers/visitController');
const {survey_post} = require('../controllers/covidController');
const {validateVisit, validateCovid} = require('../middlewares/validateBody');
const {verifyVisitId} = require('../middlewares/authentication');

router.get('/', (req, res) => res.render('form'));
router.post('/form', [validateVisit], form_post);
router.get('/survey', (req, res) => res.render('survey'));
router.post('/survey', [verifyVisitId, validateCovid], survey_post);
router.get('/qrcode', (req, res) => res.render('qrcode'));
router.get('/officeScanner', (req, res) => res.render('officeScanner'));

module.exports = router;