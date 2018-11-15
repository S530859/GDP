/* Author: santhosh Bonala */

let express = require('express');
let router = express.Router();
let UserShowController = require('../audience/controllers/user.show.controller')
let AdminShowController = require('../admin/controllers/show.controller')
let SectionController = require('../admin/controllers/section.controller')

router.get('/showlist', UserShowController.GetShowList )

router.get('/image', UserShowController.imagebyid)

router.post('/reserve', AdminShowController.reserveTickets, AdminShowController.IncReserveTicketsCount)

router.get('/sectionlist', SectionController.GetSectionList)

module.exports = router;