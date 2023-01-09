const { Router } = require('express');
const app = Router();
const blogs = require('../models/blogsModel')
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/blog/:id', (req,res) => {
    blogs.findOne({ bid: req.params.id }, (err, blog) => {
        if (err) {
          console.error(err);
          res.send('Internal Error');
        } else {
            res.render('blog', { blog: blog });
        }
    })
})
module.exports = app;