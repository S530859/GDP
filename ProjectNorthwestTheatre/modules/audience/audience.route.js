/* Author: santhosh Bonala */

var express = require('express');
var router = express.Router();
var UserShowController = require('../audience/controllers/user.show.controller')

router.get('/showlist', UserShowController.GetShowList );

router.get('/image', UserShowController.imagebyid)

module.exports = router;