// var expect = require('chai').expect
// const request = require('supertest')('http://localhost:3000/Theatre')
// const app = require('../../app')
// const mongoose = require('mongoose')

// describe('Testing Login', function(){

//     after(function(done) {
//         mongoose.connection.close()
//         done()
//     })

//     it('Using Correct Username and Password', function(done){
//         request
//         .post('/admin/authenticate')
//         .send({ "Username": "admin", "Password": "@Dmin123" })
//         .set('Accept', 'application/json')
//         .expect(200)
//         .then(response => {
//             expect(response.body.message).to.equal("Login Successful")
//             done()
//         })
//     })
//     it('Using correct Username and incorrect Password', function(done){
//         request
//         .post('/admin/authenticate')
//         .send({ "Username": "admin", "Password": "@Dmin12" })
//         .set('Accept', 'application/json')
//         .expect(401)
//         .then(response => {
//        //  console.log(response.text)
//           expect(response.text).to.equal("Authentication Failed")
//           done()
//         })
//     })
//     it('Using InCorrect Username and correct Password', function(done){
//         request
//         .post('/admin/authenticate')
//         .send({ "Username": "admin2", "Password": "@Dmin123" })
//         .set('Accept', 'application/json')
//         .expect(401)
//         .then(response => {
//          // console.log(response.text)
//           expect(response.text).to.equal("User Does not exist")
//           done()
//         })
//     })
//     it('Using Null Username and Password', function(done){
//         request
//         .post('/admin/authenticate')
//         .send()
//         .set('Accept', 'application/json')
//         .expect(401)
//         .then(response => {
//          // console.log(response.text)
//           expect(response.text).to.equal("Unauthorized")
//           done()
//         })
//     })
// })
