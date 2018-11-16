var expect = require('chai').expect
const request = require('supertest')('http://localhost:3000/Theatre')
//const app = require('../../app')
const mongoose = require('mongoose')
const should = require('chai').should()

describe('Testing GetSectionList', function(){

    after(function(done) {
        mongoose.connection.close()
        done()
    })

    it('Using correct url', function(done){
        request
        .get('/admin/sectionlist')
        .end(function(err,response){
            if(err) done(err)
            expect(response.status).to.equal(200)
            done()
        })
    })

})