/* Author: santhosh Bonala */

let express = require('express');
let router = express.Router();
let adminRoutes = require('../modules/admin/admin.route')
let audienceRoutes = require('../modules/audience/audience.route')
let middleware = require('../modules/admin/core/middleware')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index')
})

router.use('/admin', middleware, adminRoutes)

router.use('/user', audienceRoutes)

module.exports = router;
