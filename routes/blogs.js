const { Router } = require('express');
const mongoose = require('mongoose')
const app = Router();
const blogs = require('../models/blogsModel')
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/blogs', (req, res) => {
    const pop = req.flash('pop-up')
    blogs.find({}, (err, blog) => {
        if (err) {
          console.error(err);
          res.render('error');
        } else {
          blog.reverse();
          res.render('blogs', { blog: blog, pop });
        }
    }).limit(6);
})

module.exports = app;