const { Router } = require('express');
const app = Router();
const Contact = require('../models/contactModel')
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

app.get('/dashboard/messages', isLoggedIn, (req, res) => {
    const pop = req.flash('pop-up')
    Contact.find({}, (err, message) => {
      if (err) {
        console.error(err);
        res.send('Error');
      } else {
        message.reverse();
        res.render('dashboard/messages', { message: message, pop });
        
      }
    });
  });

app.post('/dashboard/messages/delete/:id', (req, res) => {
    Contact.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            var done = "Deleted!"
            req.flash('pop-up', done);
            res.redirect('/dashboard/messages')
        }
    })
})
  


module.exports = app;