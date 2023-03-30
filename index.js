const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');

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
app.use(session({ secret: 'notagoodsecret' }));

const requireLogin = (req, res, next) => {

    if (!req.session.user_id) {

        return res.redirect('/login');
    }

    next();
};

app.get('/', (req, res) => {

    res.send('HOME PAGE!');
});

app.get('/register', (req, res) => {

    res.render('register');
});

app.post('/register', async (req, res) => {

    const { username, password } = req.body;

    const user = new User({ username, password })

    await user.save();

    req.session.user_id = user._id;

    res.redirect('/');
});

app.get('/login', (req, res) => {

    res.render('login');
});

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const foundUser = await User.findAndValidate(username, password);

    if (foundUser) {

        req.session.user_id = foundUser._id;

        res.redirect('/secret');

    } else {

        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {

    req.session.destroy();
    res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {

    res.render('secret');
});

app.listen(3000, () => {

    console.log("SERVING YOUR APP!");
});
