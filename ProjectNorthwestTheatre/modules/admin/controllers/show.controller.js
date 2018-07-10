var mongoose = require('mongoose');
var ShowModel = require('../../../models/Show.model')
var fs = require('fs')

let addShow = (req, res, next) => {
    var Show = new ShowModel(req.body);
    Show.ShowImage = req.file.buffer
    buffer = req.file.buffer
    Show.save()
        .then(function (Show) {
            fs.writeSync('./images/' + Show._id, buffer, 0, buffer.length, 0)
            fs.closeSync('./images/' + Show._id)
            return res.send('Show Added successfully')
        })
        .catch(function (err) {
            return res.status(400).send('error while adding a show', err)
        })
}

module.exports.addShow = addShow;

let deleteShow = (req, res, next) => {

    ShowModel.findByIdAndRemove(req.body.id, function (err, Show) {
        if (err || !Show) return res.status(400).send('Cannot Delete, Show not found')
        res.send("Delete Successfull")
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
            res.send("Updated Successfully")
        })
}

module.exports.UpdateShow = UpdateShow


 var imagebyid = (req, res) => {
     ShowModel.findById(req.query._id, ['ShowImage'], (err, image) => {
        if (err) console.log(err)
        return res.send(image.ShowImage)
    })
}

module.exports.imagebyid = imagebyid