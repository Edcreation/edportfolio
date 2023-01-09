const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const PORT = process.env.PORT || 5000
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
// Routes
const contacts = require('./routes/Contacts');
const messages = require('./routes/messages');
const dashboard = require('./routes/dashboard');
const newb = require('./routes/new');
const login = require('./routes/login');
const signup = require('./routes/signup')
const blog = require('./routes/blog')
const blogs = require('./routes/blogs')
const dotenv = require("dotenv");
dotenv.config();


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
    process.env.MONGO_KEY,
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

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))