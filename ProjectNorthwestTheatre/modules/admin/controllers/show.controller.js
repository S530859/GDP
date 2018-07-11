/* Author: santhosh Bonala */

var mongoose = require('mongoose')
var ShowModel = require('../../../models/Show.model')
var fs = require('fs')
var path = require('path')

let addShow = (req, res, next) => {
    var Show = new ShowModel(req.body)
    Show.ShowImage = null
    buffer = req.file.buffer
    Show.save()
        .then(function (Show) {
            fs.open('images/' + Show.id, 'w', function (err, fd) {
                if (err) {
                    throw 'error opening file: ' + err
                }
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) throw 'error writing file: ' + err
                    fs.close(fd, function () {
                        console.log('file written')
                    })
                return res.send('Show Added successfully')
                })
            })
        })
        .catch(function (err) {
            return res.status(400).send('error while adding a show', err)
        })
}

module.exports.addShow = addShow

let deleteShow = (req, res, next) => {
    ShowModel.findByIdAndRemove(req.body.id, function (err, Show) {
        if (err || !Show) return res.status(400).send('Cannot Delete, Show not found')
        fs.unlink(path.join(__dirname, '../../../images', req.body.id), (err) => {
            if (err) throw err
            return res.send("Delete Successfull")
        })
    })
}

module.exports.deleteShow = deleteShow

let GetShowList = (req, res, next) => {
    ShowModel.find({},'-__v -ShowImage',function (err, ShowList) {
        if (err) return res.status(400).send('Error while getting Shows list')
        if (ShowList) {
            return res.json(ShowList)
        } else {
            return res.status(400).send('No Shows exists')
        }
    })
}

module.exports.GetShowList = GetShowList

let UpdateShow = (req, res, next) => {
    ShowModel.findByIdAndUpdate(req.body.id,req.body, function (err, Show) {
        if (err || !Show) return res.status(400).send('Show not found')
        if (req.file && req.file.buffer){
            buffer = req.file.buffer
            fs.open('images/' + Show.id, 'w', function (err, fd) {
                if (err) {
                    throw 'error opening file: ' + err
                }
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) throw 'error writing file: ' + err
                    fs.close(fd, function () {
                        console.log('file written')
                    })
                    return res.send("Updated Successfully")
                })
            })
        } else {
            return res.send("Updated Successfully")
        }
    })

}

module.exports.UpdateShow = UpdateShow

 var imagebyid = (req, res) => {
     res.sendFile(path.join(__dirname, '../../../images', req.query._id.trim()), function(err){
         console.log(err)
     })
}

module.exports.imagebyid = imagebyid