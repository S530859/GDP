const mongoose = require('mongoose')

var ShowSchema = new mongoose.Schema({
    ShowTitle : {
        type : String,
        trim : true
    },
    ShowDescription : {
        type : String,
        trim: true
    },
    ShowTime : {
        type : Date
    },
    ShowDate : {
        type : Date,
        default: Date()
    },
    NumberOfTickets : {
        type : Number,
        min : [0, 'Total Number of tickets cannot be negative']
    },
    isPublished : {
        type : Boolean
    },
    ShowImage : {
        type : Buffer
    },
    ShowPrice : {
        type : Number,
        min : [0, 'Price Cannot be negative']
    },
    ShowRating : {
        type : String,
        trim : true
    }
})

module.exports = mongoose.model('Show',ShowSchema)