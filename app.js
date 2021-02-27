require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

const {verifyAuthUser, verifyAuthRole, ROLE} = require('./middlewares/authentication');

const indexRoutes = require('./routes/indexRoute');
const authRoutes = require('./routes/authRoute');
const officeRoutes = require('./routes/officeRoute');
const adminRoutes = require('./routes/adminRoute');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/office',[verifyAuthUser, verifyAuthRole(ROLE.BASIC)], officeRoutes);
app.use('/admin',[verifyAuthUser, verifyAuthRole(ROLE.ADMIN)], adminRoutes);

app.use((req,res) => res.render('404'));

app.listen(
    process.env.PORT, 
    process.env.IP || '0.0.0.0' ,() => {
        console.log(`listening in http://${process.env.IP}:${process.env.PORT}`);
    });