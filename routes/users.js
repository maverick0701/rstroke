const express = require('express');
const router = express.Router();
const passport = require('passport');
const users_controller=require('../controller/users_controller');

router.get('/pdf/:id',passport.checkAuthentication,users_controller.print);
router.get('/profile/:id',users_controller.profile);
router.post('/update',users_controller.update);


module.exports = router;