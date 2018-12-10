let mongoose = require('mongoose')

let schema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: [true, 'name is required']
    },
    LastName: {
        type: String,
        required: true,
        trim: [true, 'name is required']
    },
    email: {
        type: String,
        required: true,
        trim: [true, 'email is required']
    }
})

const Person = mongoose.model('Contact', schema)

module.exports = {
    getPersons: () => Person.find(),
    addPerson: data => new Person(data).save(),
    deletePerson: personid => Person.findByIdAndRemove(personid),
    updatePerson: (personid, data) => Person.findByIdAndUpdate(personid, data)
   }