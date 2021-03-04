const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Visit = require('../models/visit');

module.exports.createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET);
}

module.exports.verifyAuthUser = (req, res, next) => {
    const token = req.cookies.userToken;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
            if (error) {
                res.redirect('/auth/login');
            }else{
                try {
                    const user = await User.findById(decodedToken.id);
                    if (user) {
                        req.user = user;
                        next();
                    }else{
                        res.redirect('/auth/login');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }else{
        res.redirect('/auth/login');
    }
}

module.exports.verifyLogin = (req, res, next) => {
    const token = req.cookies.userToken;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
            if (error) {
                next();
            } else{
                try {
                    const result = await User.findById(decodedToken.id);
                    if (result) {
                        if (result.role == 'admin') {
                            res.redirect('/admin/dashboard');
                        }else if (result.role == 'basic') {
                            res.redirect('/office/scanner');
                        }  
                    } else{
                        next();
                    }
                } catch (error) {
                    console.log(error);
                }     
            }
        })
    } else{
        next();
    }
}

module.exports.ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

module.exports.verifyAuthRole = (role) => {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        }else{
            res.status(404).render('404');
        }
    }
}

module.exports.verifyVisitId = (id) => {
    return new Promise((resolve, reject) => {
        if (id) {
            jwt.verify('visitId', process.env.SECRET, async (error, decodedToken) => {
                if (error) {
                    reject();
                }else{
                    try {
                        const result = await Visit.findById(decodedToken.id);
                        if (result) {
                            resolve(decodedToken.id);                          
                        }else{
                            reject();
                        }
                    } catch (error) {
                        console.log(error);
                        reject();
                    }
                }
            });
        }else{
            reject();
        }
    });
}

module.exports.verifyVisitId = (req, res, next) => {
    const token = req.cookies.visitId;
    if (token) {
        jwt.verify(token, process.env.SECRET, async (error, decodedToken) => {
            if (error) {
                res.redirect('/');
            }else{
                try {
                    const result = await Visit.findById(decodedToken.id);
                    if (result) {
                        req.visitId = result.visit_id;
                        next();                        
                    }else{
                        res.redirect('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }else{
        res.redirect('/');
    }
}