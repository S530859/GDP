/* Author: santhosh Bonala */

const mongoose = require('mongoose')

var AudienceSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        trim: true,
        required: [true, 'FirstName required']
    },
    LastName:{
        type: String,
        trim: true,
        required: [true, 'LastName required']
    },
    EmailAddress:{
        type: String,
        trim: true,
        required: [true, 'Email Address required']
    },
    NumberOfTicketsperPerson:{
        type: Number,
        min: [0, 'Minimum number of allowed tickets is 0'],
        required: [true, 'Number of Tickets required']
    },
    ShowID:{
        type: [String],
        required: [true, 'Show required']
    }
})

let model
try{
    model = mongoose.model('Audience', AudienceSchema)
}catch{
    model = mongoose.model('Audience')
}

module.exports = model