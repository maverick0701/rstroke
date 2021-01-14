const express = require('express');
const app=express();
const port=8030;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const db = require('./config/mongoose');
const Path=require('path');
require('dotenv').config({ path:Path.join(__dirname,'env','one.env')});
const passport = require('passport');
const passportLocal = require('./config/passport-local-oauth');
var multer  = require('multer')
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.use(sassMiddleware({
    src:'./assets/scss',//from where to pick up css file for compilation
    dest:'./assets/css',
    debug:false,//when in production put false
    outputStyle:'extended',
    prefix:'/css'//where should look into for css
}));
app.use(express.static("./assets"));

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: `${process.env.secretKey}`,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));







app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err},*******,dirname is `,);
    }

    console.log(`Server is running on port: ${port}`);
});