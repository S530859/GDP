var expect = require('chai').expect
const request = require('supertest')('http://localhost:3000/Theatre')
//const app = require('../../app')
const mongoose = require('mongoose')
const should = require('chai').should()

describe('Testing AddShow', function(){

    after(function(done) {
        mongoose.connection.close()
        done()
    })

    it('Entered all the fields except the image', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422,done)
      })

    it('Entered all the fields except the Show Title', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .end(function(err,response){
            if(err) done(err)
            expect(response.statusCode).to.equal(422)
            //console.log(response)
            expect(response.text).to.equal("error opening file")
            done()
        })
    })

    it('Entered all the fields except the Show Description', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field Show Description")
            done()
        })
    })

    it('Entered all the fields except the Show Date', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work","ShowTime":"01:00:00", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field Show Date")
            done()
        })
    })

    it('Entered all the fields except the Show Time', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field Show Time")
            done()
        })
    })

    it('Entered all the fields except the Show Date', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field Show Date")
            done()
        })
    })

    it('Entered all the fields except the Number of Tickets', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field NumberOfTickets")
            done()
        }) 
    })
      
    it('Entered all the fields except the Ticket Details', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field TicketDetails")
            done()
        }) 
      })
      
    //   it('Entered all the fields except the Show Rating', function(done){
    //     request
    //     .post('/admin/addshow')
    //     .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowVenue":"Ron Houston" })
    //     .set('Accept', 'application/json')
    //     .expect(422, (err,response) => {
    //         if(err) done(err)
    //      expect(response.body.message).to.equal("Missing the field ShowRating")
    //         done()
    //     }) 
    //   })

      it('Entered all the fields except the Show Venue', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A" })
        .set('Accept', 'application/json')
        .expect(422, (err,response) => {
            if(err) done(err)
            // expect(response.body.message).to.equal("Missing the field ShowVenue")
            done()
        })
      })
      
      it('Entered invalid inputs to the Show Time field', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"I am entering text", "ShowDate":"07/01/2018", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, done)
      })

      it('Entered invalid inputs to the Show Date field', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"I am entering text", "NumberOfTickets":"100", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, done)
      })

      it('Entered invalid inputs to the Number of Tickets field', function(done){
        request
        .post('/admin/addshow')
        .send({ "isPublished": "false", "ShowTitle": "Test", "ShowDescription":"It should work", "ShowTime":"01:00:00", "ShowDate":"07/01/2018", "NumberOfTickets":"I am entering text", "Ticketdetails":"100", "ShowRating":"U/A", "ShowVenue":"Ron Houston" })
        .set('Accept', 'application/json')
        .expect(422, done)
      })
    })