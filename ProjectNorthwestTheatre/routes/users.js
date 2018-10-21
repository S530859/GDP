/* Author: santhosh Bonala */

let express = require('express');
let router = express.Router();
let adminRoutes = require('../modules/admin/admin.route')
let jwt = require('jsonwebtoken')
let adminModel = require('../models/Admin.model')
let audienceRoutes = require('../modules/audience/audience.route')
let config = require('../config/config')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index')
})

let tokenAuthentication = (req, res, next) => {
  if (req.headers.token || req.query.token) {
    try {
      jwt.verify(req.headers.token || req.query.token, config.tokensecret)
      next()
    } catch (err) {
      res.status(401).send("Unauthorized")
    }
  } else {
    if (req.body.Username && req.body.Password) {
      adminModel.findOne({ Username: req.body.Username }, function (err, user) {
        if (err) res.status(401).send("Error while getting user");
            if(!user){
               return res.status(401).send('User Does not exist')
            }
            user.comparePassword(req.body.Password, function (err, isMatch) {
              if (err) res.status(400).send("Error while comparing password"); 
              if(isMatch) {
                      var data = {
                        Username: req.body.Username,
                        Password: req.body.Password
                      }
                      var token = jwt.sign(data, config.tokensecret, { expiresIn: '1h' })
                      req.session.token = token
                      next()
                  }else{
                      return res.status(401).send("Authentication Failed")
                  }  
               
             })
      })
    } else {
      res.status(401).send("Unauthorized")
    }
  }
}

router.use('/admin', tokenAuthentication, adminRoutes);

router.use('/user', audienceRoutes);

module.exports = router;
