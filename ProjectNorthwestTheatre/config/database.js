/* Author: santhosh Bonala */

const mongoose = require('mongoose');
var dburl = require('./config').url;

mongoose.connect(dburl)
.then( res => {
    console.log('DB Connected')
})
.catch( err => {
    console.log('Error: ',err);
})