const express = require('express');
const app=express();
const port=8030;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use('/', require('./routes'));

app.set('view engine', 'ejs');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});