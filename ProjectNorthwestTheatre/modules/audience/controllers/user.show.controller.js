var mongoose = require('mongoose')
var ShowModel = require('../../../models/Show.model')
var fs = require('fs')
var path = require('path')

let GetShowList = (req, res, next) => {
    ShowModel.find({}, '-__v -ShowImage', function (err, ShowList) {
        if (err) return res.status(400).send('Error while getting Shows list')
        if (ShowList) {
            return res.json(ShowList)
        } else {
            return res.status(400).send('No Shows exists')
        }
    })
}

module.exports.GetShowList = GetShowList

var imagebyid = (req, res) => {
    res.sendFile(path.join(__dirname, '../../../images', req.query._id.trim()), function (err) {
        console.log(err)
    })
}

module.exports.imagebyid = imagebyid