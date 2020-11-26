const express = require('express');
const router = express.Router();
const home_controller=require('../controller/home_controller');

router.get('/',home_controller.home);
router.post('/signUp',home_controller.create);


module.exports = router;