const { Router } = require('express');
const app = Router();
const User = require('../models/usersModel');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/signup', (req, res) => {
    const pop = req.flash('pop-up')
    res.render('signup', { pop })
})

app.post("/signup", function (req, res) {
    const done = "Done!! Log In"
    const fail = "Failed!! Try Again"
    const name = req.body.name
    const email = req.body.email
    const password = req.body.pass
    User.register(new User({ username: name, email: email }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash('pop-up', fail);
            res.redirect('/signup');
        }
        else {
            req.flash('pop-up', done);
            res.redirect('/signup');
        }
    });
});

module.exports = app;