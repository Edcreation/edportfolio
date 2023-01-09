const { Router } = require('express');
const app = Router();
const Contact = require('../models/contactModel')
app.get('/contacts', (req, res) => {
    const pop = req.flash('pop-up')
    res.render('contacts', { pop })
})
//Contacts Post methods
app.post('/contacts', (req,res) => {
   const name = req.body.name;
   const email = req.body.email;
   const message = req.body.msg;
   const done = "Done!!"
   const fail = "Failed!!"
   const contact = new Contact({
       email : email,
       name : name,
       message : message,
   })
   contact.save(function (err)  {
       if (err) {
           console.log(err);
           req.flash('pop-up', fail);
           res.redirect('/contacts')
       } else {
           req.flash('pop-up', done);
           res.redirect('/contacts');
       }
   })
})

module.exports = app;
