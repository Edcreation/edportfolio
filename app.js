const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const port = 5000
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Routes
const contacts = require('./Routes/Contacts');
const messages = require('./Routes/messages');
const dashboard = require('./Routes/dashboard');
const newb = require('./Routes/new');
const login = require('./Routes/login');
const signup = require('./Routes/signup')
const blog = require('./Routes/blog')
const blogs = require('./Routes/blogs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static( __dirname + "/public"));
app.use(cookieParser('SercetStringForCookies'));
app.use(session({
    secret: 'SecretStringForCookies',
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
app.set('view engine', 'ejs');
// Connectiing to mongoose
const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://eddy:12345@cluster0.faeyj0r.mongodb.net/?retryWrites=true&w=majority",
    {
      dbName: "Portfolio",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) =>
      err ? console.log(err) : console.log(
        "Database Connected!!!!!")
);
app.use(blog)
app.use(blogs)
app.use(signup);
app.use(login);
app.use(newb);
app.use(dashboard);
app.use(messages);
app.use(contacts);
app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log(`App listening on port ${port}!`))