require('dotenv').config();

const express = require('express');

const connectDB = require('./server/config/db');
const api = require('./server/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

//connect to DB
connectDB();

app.use(express.json());
app.use(express.static('public'));

app.use('/', api);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});