var express = require('express');
var router = express.Router();

var adminAuthenticateController = require('./controllers/authenticate.controller')
var AdminController = require('./controllers/CRUDadmin.controller') 
var ShowController = require('./controllers/show.controller')

/* Admin CRUD Operations */
router.post('/authenticate', adminAuthenticateController.authenticate);

router.post('/addadmin', AdminController.addadmin);

router.post('/deleteadmin', AdminController.deleteadmin);

router.get('/all', AdminController.GetAdminList);

router.post('/updateadmin', AdminController.UpdateAdmin );

/* Show CRUD Operations */
router.post('/addshow', ShowController.addShow);

router.get('/showlist', ShowController.GetShowList);

router.post('/updateshow', ShowController.UpdateShow);

router.post('/deleteshow', ShowController.deleteShow);

module.exports = router;