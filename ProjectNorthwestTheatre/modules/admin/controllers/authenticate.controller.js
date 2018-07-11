/* Author: santhosh Bonala */

var mongoose = require('mongoose')
var adminModel = require('../../../models/Admin.model')

let authenticate = (req,res,next) => {

    adminModel.findOne({ Username: req.body.Username }, function (err, user) {
        if (err) return res.status(401).send("Unauthorized");
                user.AccessToken = req.session.token
        user.save(err => {
            if (err) {
                console.log(err)
                return res.status(401).send("Unauthorized")
            }
            return res.json({
                token: req.session.token,
                message: "Login Successful"
            })
        })        
    })
}

module.exports.authenticate = authenticate;

let guard = (req, res, next) => {

           res.json({
                message: "Login Successful"
            })

}

module.exports.guard = guard;