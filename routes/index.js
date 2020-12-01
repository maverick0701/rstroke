const express = require('express');
const router = express.Router();
const passport = require('passport');
const home_controller=require('../controller/home_controller');
router.get('/',home_controller.home);
router.use('/users', require('./users'));
router.post('/signUp',home_controller.create);
router.post('/signIn', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), home_controller.display);
router.get('/signOut',home_controller.destroySession);

module.exports = router;