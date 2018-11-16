let Person = require('../../../models/Contact.model')

let addPerson = (req,res) => {
    Person
    .addPerson(req.body)
    .then(person => {
        res.send('person added successfully')
    })
    .catch(err => {
        res.send(422, 'please check details again')
    })
} 

module.exports.addPerson = addPerson

let getpersonlist = (req,res) => {
    Person
    .getPersons()
    .then(personlist => {
        res.json(personlist)
    })
    .catch(err => {
        res.send(422, 'please check details again')
    })
} 

module.exports.getpersonlist = getpersonlist

let editperson = (req,res) => {
    Person
    .updatePerson(req.body.id, req.body)
    .then(person => {
        res.send('person updated successfully')
    })
    .catch(err => {
        res.send(422, 'please check details again')
    })
} 

module.exports.editperson = editperson

let deleteperson = (req,res) => {
    Person
    .deletePerson(req.body.id)
    .then(person => {
        res.send('person deleted successfully')
    })
    .catch(err => {
        res.send(422, 'please check details again')
    })
} 

module.exports.deleteperson = deleteperson