require('dotenv').config();
const User = require('../models/user');

const register = () => {
    return new Promise( async (resolve, reject) => {
        const user = new User(
            'adminbaste', // username
            'bastevisitor', // password
            'admin'
        )
        try {
            const result = await User.create(user);
            console.log('Admin setup success');
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

register()
.then(() => process.exit(0))
.catch(error => console.log(error));