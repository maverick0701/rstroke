const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const Path=require('path');
require('dotenv').config({ path:Path.join(__dirname,'..','env','one.env')});
passport.use(new googleStrategy({
    clientID:process.env.clientid,
    clientSecret:process.env.clientkey,
    callbackURL:process.env.google_callbackURL
},
    function(accessToken,refreshToken,profile,done)
    {
        User.findOne({email:profile.emails[0].value}).exec(function(err,user)
        {
            if(err){console.log(err,"error is here line 15 google stratergy");return;}
            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user)
                {
                    if(err){console.log(err,"error is here line 29 google stratergy");return;}
                    return done(null,user);
                })
            }
        })
    }
))