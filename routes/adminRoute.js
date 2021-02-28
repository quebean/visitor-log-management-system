const express = require('express');
const router = express.Router();
const {covid, covid_show} = require('../controllers/covidController');
const {visit_post, scanner_post, visit_show} = require('../controllers/visitController');
const {office, create_office_post, office_delete, office_edit, office_put} = require('../controllers/officeController');
const {validateOffice, validateOfficeUpdate} = require('../middlewares/validateBody');

router.get('/dashboard', (req, res) => res.render('admin/dashboard'));

router.get('/visit', (req, res) => res.render('admin/visit'));
router.post('/visit', visit_post);
router.get('/visit/:id', visit_show);

router.get('/covid', (req, res) => res.render('admin/covid'));
router.post('/covid', covid);
router.get('/covid/:id', covid_show);

router.get('/office', (req, res) => res.render('admin/office'));
router.post('/offices', office);
router.get('/office/edit/:id', office_edit);
router.post('/office/edit/:id', [validateOfficeUpdate], office_put);
router.get('/create-office', (req, res) => res.render('admin/coffice'));
router.post('/create-office', [validateOffice], create_office_post);

router.get('/scanner', (req, res) => res.render('admin/scanner'));
router.post('/scanner', scanner_post)

router.get('/update', (req, res) => res.render('admin/update-user'));


module.exports = router;