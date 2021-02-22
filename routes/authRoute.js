const express = require('express');
const router = express.Router();
const {login_post, register, logout} = require('../controllers/authController');
const {verifyLogin} = require('../middlewares/authentication');
const {validateLogin} = require('../middlewares/validateBody');

router.get('/login', [verifyLogin], (req, res) => res.render('login'));
router.post('/login', [validateLogin], login_post);
// router.post('/register', register);
router.get('/logout', logout);

module.exports = router;