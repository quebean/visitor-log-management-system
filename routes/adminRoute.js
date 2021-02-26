const express = require('express');
const router = express.Router();
const {covid} = require('../controllers/covidController');
const {visit_post, scanner_post} = require('../controllers/visitController');
const {office, create_office_post, office_delete} = require('../controllers/officeController');
const {validateOffice} = require('../middlewares/validateBody');

router.get('/dashboard', (req, res) => res.render('admin/dashboard'));
router.get('/visit', (req, res) => res.render('admin/visit'));
router.post('/visit', visit_post);
router.get('/covid', (req, res) => res.render('admin/covid'));
router.post('/covid', covid);
router.get('/office', (req, res) => res.render('admin/office'));
router.post('/offices', office);
router.get('/delete/:id', office_delete);
router.get('/create-office', (req, res) => res.render('admin/coffice'));
router.post('/create-office', [validateOffice], create_office_post);
router.get('/scanner', (req, res) => res.render('admin/scanner'));
router.post('/scanner', scanner_post)
router.get('/update', (req, res) => res.render('admin/update-user'));


module.exports = router;