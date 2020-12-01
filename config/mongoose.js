const mongoose = require('mongoose');
const Path=require('path');
require('dotenv').config({ path:Path.join(__dirname,'..','env','one.env')});

mongoose.connect(`mongodb+srv://${process.env.dbName}:${process.env.pass}@cluster0.s0lia.mongodb.net/rstroke?retryWrites=true&w=majority`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;