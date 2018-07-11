/* Author: santhosh Bonala */

var express = require('express')
var router = express.Router()
var multer = require('multer')
var adminAuthenticateController = require('./controllers/authenticate.controller')
var AdminController = require('./controllers/CRUDadmin.controller') 
var ShowController = require('./controllers/show.controller')
var SectionController = require('./controllers/section.controller')

/* Admin CRUD Operations */
router.post('/authenticate', adminAuthenticateController.authenticate)

router.post('/addadmin', AdminController.addadmin)

router.post('/deleteadmin', AdminController.deleteadmin)

router.get('/all', AdminController.GetAdminList)

router.post('/updateadmin', AdminController.UpdateAdmin)

/* Show CRUD Operations */
router.post('/addshow', multer().single('ShowImage'), ShowController.addShow)

router.get('/showlist', ShowController.GetShowList)

router.post('/updateshow', multer().single('ShowImage'), ShowController.UpdateShow)

router.post('/deleteshow', ShowController.deleteShow)

router.post('/guard', adminAuthenticateController.guard)

router.get('/image', ShowController.imagebyid)

/* section CRUD operations */
router.post('/addsection', SectionController.addSection)

router.post('/updatesection', SectionController.UpdateSection)

router.get('/sectionlist', SectionController.GetSectionList)

router.post('/deletesection', SectionController.deleteSection)

module.exports = router