/* Author: santhosh Bonala */

var mongoose = require('mongoose');
var AdminModel = require('../../../models/Admin.model')

let addadmin = (req,res,next) => {

    AdminModel.findOne({ Username: req.body.RegUsername }, function(err,admin){
        if(err || admin) return res.status(403).send('Already a user exists with that username')
        var admin = new AdminModel({
            Username: req.body.RegUsername,
            Email: req.body.RegEmail,
            Password: req.body.RegPassword
        });
        admin.save()
            .then(function (admin) {
                return res.send('Admin Added successfully')
            })
            .catch(function (err) {
                return res.status(400).send('error while adding a admin')
            })
    })
   

}

module.exports.addadmin = addadmin;

let deleteadmin = (req,res,next) => {
    
    AdminModel.findByIdAndRemove(req.body.id, function(err,admin){
        if (err || !admin) return res.status(400).send('Cannot Delete, User not found')
        res.send("Delete Successfull")
    })

}

module.exports.deleteadmin = deleteadmin

let GetAdminList = (req,res,next) => {
    AdminModel.find({},['Username','Email'],function(err,adminList){
        if(err) return res.status(400).send('Error while getting admins list')
        if(adminList){
            return res.json(adminList)
        }else{
            return res.status(400).send('No admins exists')
        }
    })
}

module.exports.GetAdminList = GetAdminList

let UpdateAdmin = (req,res,next) => {
    AdminModel.findByIdAndUpdate( req.body.id,
         { Username: req.body.updateusername, Email: req.body.updateemail },
         function(err, admin) {
        if (err || !admin) return res.status(400).send('User not found')
        res.send("Updated Successfully")
    })
}

module.exports.UpdateAdmin = UpdateAdmin