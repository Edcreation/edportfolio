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

app.get("/login", function (req, res) {
    const pop = req.flash('pop-up')
    res.render("login", { pop });
});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}), function (req, res) {
    // var done = "Welcome"
    var done = "Failed!! Try Again"
    req.flash('pop-up', done);
});

/*app.post('/login', (req, res, next) => {
    var done = "Done!! Logged In"
    var fail = "Failed!! Try Again"
    passport.authenticate('local', function (err, user, info) {      
        if (err) {
            req.flash('pop-up', fail);
            console.log(err)
            return res.redirect('/login');
        }
        if (user) {
            req.flash('pop-up', done);
            console.log(user)
            res.redirect('/dashboard');
        }
        else if(!user){
            req.flash('pop-up', fail);
            return res.redirect('/login');
        } else {
            res.status(401).json(info);
            console.log("failed")
        }
    })(req, res, next)
})*/

module.exports = app;