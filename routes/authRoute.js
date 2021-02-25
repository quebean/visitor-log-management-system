const express = require('express');
const router = express.Router();
const {login_post, update, logout} = require('../controllers/authController');
const {verifyLogin} = require('../middlewares/authentication');
const {validateLogin, validateUpdate} = require('../middlewares/validateBody');

router.get('/login', [verifyLogin], (req, res) => res.render('login'));
router.post('/login', [validateLogin], login_post);
router.post('/update',[validateUpdate], update);
router.get('/logout', logout);

module.exports = router;