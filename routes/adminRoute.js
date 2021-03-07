const express = require('express');
const router = express.Router();
const {covidSearch, covidShow} = require('../controllers/covidController');
const {visitSearch, visitUpdateTimeOut, visitShow, dashboard} = require('../controllers/visitController');
const {officeSearch, createOffice, officeShow, officeUpdate} = require('../controllers/officeController');
const {validateOffice, validateOfficeUpdate, validateUpdate} = require('../middlewares/validateBody');
const {updateUser} = require('../controllers/authController');

router.get('/dashboard', (req, res) => res.render('admin/dashboard'));
router.get('/visit', (req, res) => res.render('admin/visit'));
router.get('/covid', (req, res) => res.render('admin/covid'));
router.get('/office', (req, res) => res.render('admin/office'));
router.get('/office/create', (req, res) => res.render('admin/coffice'));
router.get('/scanner', (req, res) => res.render('admin/scanner'));
router.get('/update', (req, res) => res.render('admin/update-user'));


router.get('/dashboard-chart', dashboard);

router.post('/visit', visitSearch);
router.get('/visit/:id', visitShow);


router.post('/covid', covidSearch);
router.get('/covid/:id', covidShow);


router.post('/offices', officeSearch);
router.get('/office/edit/:id', officeShow);
router.post('/office/edit/:id', [validateOfficeUpdate], officeUpdate);

router.post('/create-office', [validateOffice], createOffice);
router.post('/user/update',[validateUpdate], updateUser);

router.post('/scanner', visitUpdateTimeOut)




module.exports = router;