const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/register', (req, res) => {

    res.render('register');
});

app.get('/secret', (req, res) => {

    res.send('Authentication demo');
});

app.listen(3000, () => {

    console.log("SERVING YOUR APP!");
});
