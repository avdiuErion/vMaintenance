require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('./server/config/db.js');

const { connectDB } = require('./server/config/db');
const api = require('./server/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

//connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(cookieParser());
app.use(session({
    secret: 'mYsECRET',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    })
}));

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(api);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});