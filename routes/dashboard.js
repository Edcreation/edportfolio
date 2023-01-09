const { Router } = require('express');
const app = Router();
const User = require('../models/usersModel');
const blogs = require('../models/blogsModel')
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

app.get("/dashboard", isLoggedIn, function (req, res) {
    const pop = req.flash('pop-up')
    User.findById(req.user, function(err, user) {
        if (err) {
            // Handle the error
        }
        // Render the profile page and pass in the user's name
        var done = user.username
        req.flash('pop-up', done);
        blogs.find({}, (err, blog) => {
            if (err) {
              console.error(err);
              res.send('Error');
            } else {
              blog.reverse();
              res.render("dashboard/dashboard", { pop,done,blog });  
            }
        });
    });
    
});

module.exports = app;