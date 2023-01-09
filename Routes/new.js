const { Router } = require('express');
const app = Router();
const Blog = require('../models/blogsModel')
const { marked } = require('marked');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

app.get('/dashboard/new', isLoggedIn, (req, res) => {
    const pop = req.flash('pop-up')
    res.render('dashboard/new', {pop} )
})

app.post('/dashboard/new', (req,res) => {
    function generateRandomWord(length) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz';
        let word = '';
        for (let i = 0; i < length; i++) {
          word += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        }
        return word;
    }
    const bid = generateRandomWord(12);
    const content = marked(req.body.content)
    const title = req.body.title;
    const done = "Created!!"
    const fail = "Failed!!"
    const blog = new Blog({
        bid : bid,
        title : title,
        content : content,
    })
    blog.save(function (err)  {
        if (err) {
            console.log(err);
            req.flash('pop-up', fail);
            res.redirect('/dashboard/new')
        } else {
            req.flash('pop-up', done);
            res.redirect('/dashboard/new');
        }
    })
})

module.exports = app;