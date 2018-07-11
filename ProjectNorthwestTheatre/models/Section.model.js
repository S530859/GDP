/* Author: santhosh Bonala */

const mongoose = require('mongoose')

var SectionSchema = mongoose.Schema({
    ProfessorName: {
        type: String,
        trim: true
    },
    ClassDay: {
        type: String,
        trim: true
    },
    ClassTime: {
        type: String,
        trim: true
    },
    SectionNumber: {
        type: Number,
        min: [1,'Section Number cannot be Negative']
    },
    Semester: {
        type: String,
        trim: true
    },
    Year: {
        type: Number,
        min: [Date.Year, 'Year cannot be less than current year']
    }
})

module.exports = mongoose.model('Section', SectionSchema)