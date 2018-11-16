var expect = require('chai').expect
const request = require('supertest')('http://localhost:3000/Theatre')
//const app = require('../../app')
const mongoose = require('mongoose')

describe('Testing ReserveTickets', function () {

    after(function (done) {
        mongoose.connection.close()
        done()
    })

    it('Entered all the fields of student correctly', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "LastName": "Illendula", "EmailAddress": "s530459@nwmissouri.edu", "NumberOfTicketsperPerson": 1, "isStudent": true })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                // expect(response.text).to.equal("Reservation Successful")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Entered all the fields of general audience correctly', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "LastName": "Illendula", "EmailAddress": "s530459@gmail.com", "NumberOfTicketsperPerson": 5, "isStudent": false })
            .set('Accept', 'application/json')
            .expect(200)
            .then(response => {
                // expect(response.text).to.equal("Reservation Successful")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Entered all the fields except the FirstName', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "LastName": "Illendula", "EmailAddress": "s530459@gmail.com", "NumberOfTicketsperPerson": 5, "isStudent": false })
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Missing the field FirstName")
                done()
            })
    })

    it('Entered all the fields except the LastName', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "EmailAddress": "s530459@gmail.com", "NumberOfTicketsperPerson": 5, "isStudent": false })
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Missing the field LastName")
                done()
            })
    })

    it('Entered all the fields except the EmailAdress', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "LastName": "Illendula", "NumberOfTicketsperPerson": 5, "isStudent": false })
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Missing the field EmailAddress")
                done()
            })
    })

    it('Entered all the fields except isStudent', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "LastName": "Illendula", "EmailAddress": "s530459@nwmissouri.edu", "NumberOfTicketsperPerson": 1})
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Missing the field isStudent")
                done()
            })
    })

    it('Entered invalid inputs for FirstName', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "1234", "LastName": "Illendula", "EmailAddress": "s530459@nwmissouri.edu", "NumberOfTicketsperPerson": 1, "isStudent": true })
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Unprocessable Entity")
                done()
            })
    })

    it('Entered invalid inputs for LastName', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "LastName": "12345", "EmailAddress": "s530459@nwmissouri.edu", "NumberOfTicketsperPerson": 1})
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Unprocessable Entity")
                done()
            })
    })

    it('Entered invalid entry in the field EmailAddress', function (done) {
        request
            .post('/admin/reserveTicket')
            .send({ "FirstName": "Varun", "LastName": "Illendula", "EmailAddress": "s530459", "NumberOfTicketsperPerson": 1, "isStudent": true })
            .set('Accept', 'application/json')
            .expect(400, (err, response) => {
                if (err) done(err)
                // expect(response.text).to.equal("Unprocessable Entity")
                done()
            })
    })
})


