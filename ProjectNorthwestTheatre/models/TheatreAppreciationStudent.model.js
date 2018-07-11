/* Author: santhosh Bonala */

const mongoose = require('mongoose')

var TheatreAppreciationStudentSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        trim: true,
        required: [true, 'FirstName required']
    },
    LastName: {
        type: String,
        trim: true,
        required: [true, 'LastName required']
    },
    EmailAddress: {
        type: String,
        trim: true,
        required: [true, 'Email Address required']
    },
    NumberOfTicketsperPerson: {
        type: Number,
        min: [0, 'Minimum number of allowed tickets is 0'],
        required: [true, 'Number of Tickets required']
    },
    ShowID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Show required']
    },
    SectionEnrolled:{
        type: String,
        trim: true,
        required: [true, 'Section Enrolled required']
    }
})

module.exports = mongoose.model('TheatreAppreciationStudent', TheatreAppreciationStudentSchema)