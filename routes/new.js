
const { Router } = require('express');
const app = Router();
const Blog = require('../models/blogsModel')
const { marked } = require('marked');
const multer = require('multer');
const path = require("path");
const { v4: uuidv4 } = require('uuid');
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


// upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "images");
    },
    filename: function(req, file, cb) {  
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
let upload = multer({ storage, fileFilter });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

app.get('/dashboard/new', isLoggedIn, (req, res) => {
    const pop = req.flash('pop-up')
    res.render('dashboard/new', {pop} )
})
app.post('/dashboard/new',upload.single('image'), (req,res) => {
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
    const img = req.body.image;
    const done = "Created!!"
    const fail = "Failed!!"
    const blog = new Blog({
        bid : bid,
        title : title,
        image: img,
        content : content,
    })
    blog.save(function (err)  {
        if (err) {
            console.log(err);
            console.log(req.body.filename)
            req.flash('pop-up', fail);
            res.redirect('/dashboard/new')
        } else {
            req.flash('pop-up', done);
            res.redirect('/dashboard/new');
        }
    })
})


module.exports = app;