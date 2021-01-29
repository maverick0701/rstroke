const express = require('express');
const router = express.Router();
const passport = require('passport');
const Path=require('path');
require('dotenv').config({ path:Path.join(__dirname,'..','env','one.env')});
const home_controller=require('../controller/home_controller');
router.get('/',home_controller.home);
router.get('/third/:id',passport.checkAuthentication,home_controller.third);
router.get('/second',home_controller.second)
router.use('/users', require('./users'));
router.post('/signUp',home_controller.create);
router.post('/image/upload',home_controller.upload);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get(process.env.google_callbackURL2, passport.authenticate('google', {failureRedirect: '/signIn'}),home_controller.display);
router.post('/signIn', passport.authenticate('local',{failureRedirect: '/'},),home_controller.display); 
router.get('/signOut',home_controller.destroySession);
router.get('/res/:user',home_controller.resume)
module.exports = router;