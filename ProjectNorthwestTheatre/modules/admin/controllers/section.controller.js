/* Author: santhosh Bonala */

var SectionModel = require('../../../models/Section.model')

let addSection = (req, res, next) => {
    var Section = new SectionModel(req.body)
    Section.save()
            .then(function (Section) {
                return res.send('Section Added successfully')
            })
            .catch(function (err) {
                return res.status(400).send('error while adding a Section', err)
            })
}
module.exports.addSection = addSection

let deleteSection = (req, res, next) => {

    SectionModel.findByIdAndRemove(req.body.id, function (err, Section) {
        if (err || !Section) return res.status(400).send('Cannot Delete, Section not found')
        res.send("Delete Successfull")
    })

}

module.exports.deleteSection = deleteSection

let GetSectionList = (req, res, next) => {
    SectionModel.find({}, '-__v', function (err, SectionList) {
        if (err) return res.status(400).send('Error while getting Section list')
        if (SectionList) {
            return res.json(SectionList)
        } else {
            return res.status(400).send('No Section exists')
        }
    })
}

module.exports.GetSectionList = GetSectionList

let UpdateSection = (req, res, next) => {
    SectionModel.findByIdAndUpdate(req.body.id, req.body, function (err, Section) {
        if (err || !Section) return res.status(400).send('Section not found')
        res.send("Updated Successfully")
    })
}

module.exports.UpdateSection = UpdateSection

