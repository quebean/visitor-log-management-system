const User = require('../models/user');

module.exports.validateLogin = (req, res, next) => {
    const {username, password} = req.body;
    if (!username && !password) {
        res.status(400).json({success: false, message: 'Username and password field can not be empty.'})
    }else if(!username){
        res.status(400).json({success: false, message: 'Username field can not be empty.'})
    }else if(!password){
        res.status(400).json({success: false, message: 'Password field can not be empty.'})
    }else{
        next();
    }
}

module.exports.validateUpdate = async (req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).json({success: false, message: 'Username and password field can not be empty.'});
    } else if(password.length < 8) {
        res.status(400).json({success: false, message: 'Password must be atleast 8 characters long'});
    } else{
        try {
            const user = await User.findByUsername(username);
            if (user) {
                req.user = user;
                next();
            }else{
                res.status(400).json({success: false, message: 'Username is not registered.'})
            }
        } catch (error) {
            console.log(error);
        }
    }
} 

module.exports.validateCovid = (req, res, next) => {
    if (!req.visitId) {
        res.status(400).redirect('/');
    }else if(!req.visitId || !req.body.temperature || !req.body.age || !req.body.sex || !req.body.fever || !req.body.cough || !req.body.colds || !req.body.shortnessOfBreath || !req.body.diarrhea || !req.body.travel || !req.body.closeContact || !req.body.careWOPPE || !req.body.closeENV || !req.body.travelTogether || !req.body.agree){
        res.status(400).json({success: false, message: 'Incomplete body variables to create covid survey'});
    }else{
        next();
    }
}

module.exports.validateOffice = async (req, res, next) => {
    const results = {};
    results.success = true;
    const {officeName, incharge, username, password} = req.body;
    
    if (!officeName || !incharge || !username || !password) {
        results.success = false;
        results.message = 'Incomplete variables to create office.'
    }else if (username == password) {
        results.success = false;
        results.message = 'Password and username can not be the same.'
    }else if (username.length < 8) {
        results.success = false;
        results.message = 'Username must be atlest 8 characters long.'
    }else if (password.length < 8) {
        results.success = false;
        results.message = 'Password must be atlest 8 characters long.'
    } else{
        try {
            const result = await User.findByUsername(username);
            if(result){
                results.success = false;
                results.message = 'Username is already taken.'
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    if(results.success){
        next();
    }else{
        res.status(400).json(results);
    }
}

module.exports.validateVisit = (req, res, next) => {
    const results = {};
    results.success = true;
    const {name, address, contactNumber, purpose} = req.body;

    if(!name || !address || !contactNumber || !purpose){
        results.success = false;
        results.message = 'Incomplete variable to create visit form.'; 
    }

    if(results.success){
        next();
    }else{
        res.status(400).json(results);
    }
}

