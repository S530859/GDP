/* Author: santhosh Bonala */

//let mongoose = require('mongoose')
let ShowModel = require('../../../models/Show.model')
let fs = require('fs')
let path = require('path')
let StudentModel = require('../../../models/TheatreAppreciationStudent.model')
let GeneralAudienceModel = require('../../../models/Audience.model')
let ObjectId = require('mongoose').Types.ObjectId
let _ = require('underscore')

let addShow = (req, res, next) => {
    _.each(req.body, function(value,key){
        if(!value){
           return res.send(400, `${key} cannot be empty`)
        }
    })
    if(!req.body.Ticketdetails) return res.status(422).send("Ticketdetails field cannot be empty")
    req.body.Ticketdetails = JSON.parse(req.body.Ticketdetails) 
    let Show = new ShowModel(req.body)
    buffer = req.file && req.file.buffer ? req.file.buffer : undefined
    Show.save()
        .then(function (Show) {
            fs.open('images/' + Show.id, 'w', function (err, fd) {
                if (err) return res.status(422).send('error opening file: ' + err)
                if(!buffer) return res.status(422).send('error opening file: ' + err)
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) return res.status(422).send('error writing file: ' + err)
                    fs.close(fd, function () {
                        console.log('file written')
                    })
                   return res.send('Show Added successfully')
                })
            })
        })
        .catch(function (err) {
            return res.status(400).send('error while adding a show' + err)
        })
}

module.exports.addShow = addShow

// This method deletes the show specified
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
    ShowModel.find({},'-__v',function (err, ShowList) {
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
    req.body.Ticketdetails = JSON.parse(req.body.Ticketdetails)
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

 let imagebyid = (req, res) => {
     res.sendFile(path.join(__dirname, '../../../images', req.query._id.trim()), function(err){
         console.log(err)
     })
}

module.exports.imagebyid = imagebyid

let isPublished = (req,res) => {
        ShowModel.findByIdAndUpdate(req.body.id, req.body, function (err, Show) {
            if (err || !Show) return res.status(400).send('Show not found')
            return res.send("Updated Successfully")
        })
}

module.exports.isPublished = isPublished

let GetduplicateShow = (req, res, next) => {
        let previd = req.body._id
        delete req.body._id
        let duplicateshow = new ShowModel(req.body)
        duplicateshow
        .save()
        .then( res => {
            fs.copyFileSync('./images/' + previd, './images/' + res._id)
            next()
        })
        .catch( err => {
             return res.status(400).send('error while duplicating a show', err)
        })              
}

module.exports.GetduplicateShow = GetduplicateShow

let CheckForShowExistence = (req,res,next) => {
    ShowModel.findOne({ _id: req.body.show_id }).exec( (err, show) => {
        if(err || !show) return res.send(400, "Show not found")
        next()
    })
}
module.exports.CheckForShowExistence = CheckForShowExistence

let reserveTickets = (req,res,next) => {
    req.body.SectionEnrolled = req.body.SectionEnrolled ? parseInt(req.body.SectionEnrolled) : null
    req.body.NumberOfTicketsperPerson = req.body.NumberOfTicketsperPerson ? parseInt(req.body.NumberOfTicketsperPerson) : null
      let model = req.body.isStudent ? StudentModel : GeneralAudienceModel
        model.findOne({ "EmailAddress": req.body.EmailAddress }, (err,reserve) => {
            if(err) return res.send(400, "Student not found")
            if(reserve){
                console.log(reserve.ShowID)
               if(_.contains(reserve.ShowID, req.body.show_id)) return res.send(400, "Already Registered")
                reserve.ShowID.push(req.body.show_id)
                reserve.save((err) => {
                    if(err) return res.send(400, "Error while reserving Ticket")
                    next()
                })
            }else{
                req.body.ShowID = [req.body.show_id]
                new model(req.body).save((err,Student) => {
                    if(err) return res.send(400, "Error while reserving Ticket")
                    next()
                })
            }
        })  
}
module.exports.reserveTickets = reserveTickets


let IncReserveTicketsCount = (req,res) => {
    let reservedseats = req.body.NumberOfTicketsperPerson ? req.body.NumberOfTicketsperPerson : 1 
    ShowModel.findOneAndUpdate({ _id: req.body.show_id }, { $inc: { ReservedSeats : reservedseats } }).exec((err,show) => {
        if(err) console.log(`error when incrementing the count for show reserved seats`)
        return res.send(200, "Ticket reserved")
    })
}

module.exports.IncReserveTicketsCount = IncReserveTicketsCount

let getAllStudentsForAShow = async (req,res) => {
    let students = await Promise.all([  StudentModel.find(
                                            { ShowID: req.body.show_id },
                                            ['EmailAddress', 'LastName','FirstName', 'SectionEnrolled']
                                        ).exec() ,
                                        GeneralAudienceModel.find(
                                            { ShowID: req.body.show_id },
                                            ['EmailAddress', 'LastName', 'FirstName', 'NumberOfTicketsperPerson']
                                        ).exec() 
                                    ])
        students = [ ...students[0], ...students[1]]
        return res.json(students)
}

module.exports.getAllStudentsForAShow = getAllStudentsForAShow

let unreserve = (req,res,next) => {
    let model = req.body.isStudent ? StudentModel : GeneralAudienceModel
        model.findOne({ _id: req.body.id }, function (err, reserve) {
            if (err || !reserve) return res.status(400).send('Cannot Delete, Reservee not found')
            console.log(reserve.ShowID)
            if(!_.contains(reserve.ShowID, req.body.show_id)) return res.send(400, "Student has not registered for this show")
            _.each(reserve.ShowID, function(ele,index){
                if(ele === req.body.show_id){
                    reserve.ShowID.splice(index,1)
                }
            })
            if(reserve.ShowID.length <= 0) {
                model.findOneAndDelete({ _id : reserve.id },function(err,doc){
                    if(err) return res.send(400, "Error while unreserving Ticket saving")
                        next()
                })
            }else{
                reserve.save((err) => {
                    if(err) return res.send(400, "Error while unreserving Ticket saving")
                        next()
                })          
            }
        })
}

module.exports.unreserve = unreserve

let DecReserveTicketsCount = (req,res,next) => {
    ShowModel.findOneAndUpdate({ _id: req.body.show_id }, { $inc: { ReservedSeats : -1 } }).exec((err,show) => {
        if(err) console.log(`error when decrementing the count for show reserved seats`)
        next()
    })
}

module.exports.DecReserveTicketsCount = DecReserveTicketsCount