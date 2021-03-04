const User = require('../models/user');
const {createToken} = require('../middlewares/authentication');

module.exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await User.login(username, password);
        const token = await createToken(result.user_id);
        res.cookie('userToken', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
        res.status(200).json({success: true, role: result.role})
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
}

module.exports.updateUser = async (req, res) => {
    const user = new User(
        req.user.username,
        req.body.password,
        req.user.role
    )
    try {
        const result = await User.updateById(req.user.user_id, user);
        res.status(200).json({success: true, role: req.user.role});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false});
    }
}

module.exports.logout = (req, res) => {
    res.cookie('userToken', '', {httpOnly: true, maxAge: 0});
    res.redirect('login');
}