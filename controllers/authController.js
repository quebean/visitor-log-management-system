const User = require('../models/user');
const {createToken} = require('../middlewares/authentication');

module.exports.login_post = async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await User.login(username, password);
        const token = await createToken(result.user_id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
        res.status(200).json({success: true, role: result.role})
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
}

// module.exports.register = async (req, res) => {
//     const user = new User(
//         req.body.username,
//         req.body.password,
//         'admin'
//     )
//     try {
//         const result = await User.create(user);
//         res.status(200).json({message: 'Sucesss'});
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({message: 'Failed'});
//     }
// }

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {httpOnly: true, maxAge: 0});
    res.redirect('login');
}