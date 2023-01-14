const { Router } = require('express');
const app = Router();
const Blog = require('../models/blogsModel')
const { marked } = require('marked');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const methodOverride = require('method-override');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path')

// const path = require("path");
// const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


// upload image
const mongoURI = "mongodb+srv://eddy:12345@cluster0.faeyj0r.mongodb.net/?retryWrites=true&w=majority"
var conn = mongoose.createConnection(mongoURI);
let gfs, gridfsBucket;
conn.once('open', () => {
 gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
 bucketName: 'blogs'
});

 gfs = Grid(conn.db, mongoose.mongo);
 gfs.collection('blogs');
})
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'blogs'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}
// app.get('/dashboard/test', (req,res) => {
//     res.render('dashboard/new')
// })
// app.post('/dashboard/test', upload.single('image'), (req,res) => {
//     res.json({ file: req.file })
// })


app.get('/dashboard/new', isLoggedIn, (req, res) => {
    const pop = req.flash('pop-up')
    res.render('dashboard/new', {pop} )
})
app.get('/image/:filename', (req,res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No suchi file Exists'
            });
        }
    const readStream = gridfsBucket.openDownloadStreamByName(req.params.filename)
    readStream.pipe(res);
        // if (file.contentType === 'image/jpeg ' || file.contentType === 'image/png ' || file.contentType === 'image/jpg') {
        // } else {
        //     res.status(404).json({
        //         err: 'Not valid type '
        //     });
        // }  
    })
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
    const done = "Created!!"
    const fail = "Failed!!"
    const blog = new Blog({
        bid : bid,
        title : req.body.title,
        image : req.file.filename,
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
            res.redirect('/dashboard/new')
        }
    })
})


module.exports = app;