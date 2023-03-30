const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/authDemo')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!");
        console.log(err);
    });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {

    res.send('HOME PAGE!');
});

app.get('/register', (req, res) => {

    res.render('register');
});

app.post('/register', async (req, res) => {

    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        password: hash
    })

    await user.save();

    res.redirect('/');
});

app.get('/secret', (req, res) => {

    res.send('Authentication demo');
});

app.listen(3000, () => {

    console.log("SERVING YOUR APP!");
});
