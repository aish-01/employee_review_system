// 1. Import Express
require('dotenv').config();
require('./config/mongoose.js');
const express = require('express');
const passportConfig = require('./config/passport_local');
const passport = require('passport');

// for parsing the data in cookie
// const cookieParser = require(cookie-parser);

// store the session created by passport
const session = require('express-session');

// importing layouts
const expressLayouts = require('express-ejs-layouts');

// flash messages and middleware
const flash = require('connect-flash');
const myMware = require('./config/middleware');

const MongoStore = require('connect-mongo');
const {PORT} = process.env;

// 2.Create Server
const server = express();

// for reading json data
server.use(express.json());

// for reading url data
server.use(express.urlencoded({
    extended:true
}));

// for static files folder

// server.use(cookieParser());

server.use(expressLayouts);

// extracting stylesheets and scripts for individual pages
server.set('layout extractStyles',true);
server.set('layout extractScripts',true);

// setting view engine as ejs and defining it's path
server.set('view engine','ejs');
server.set('views','./view');

// use express-session for session management
server.use(session({
    secret:process.env.SECRET_KEY, 
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:24*60*60*1000, //session duration in milliseconds
        secure:false,
    },
    // store the session in database
    store:MongoStore.create({
        mongoUrl:process.env.DB_URL
    })

}));

// connect flash middleware
server.use(flash());
server.use(myMware.setFlash);

// initialise passport
server.use(passport.initialize());

// passport sessions
server.use(passport.session());

// store the logged in user's data in local variable
server.use(passport.setAuthenticatedUser);


// server.get('/',(req,res)=>{
//     res.send("Welcome to Employee Review System");
// });
//routes
server.use('/',require('./routes'));

// 4.Specify port
server.listen(PORT,()=>{
console.log(`Server is running at port: ${PORT}`)
});
