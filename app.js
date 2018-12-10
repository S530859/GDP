/* Author: santhosh Bonala */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var users = require('./routes/users');
var db = require('./config/database');
var app = express();
var config = require('./config/config')
var session = require('express-session')
var cors = require('cors')
// let mongoose = require('mongoose')

// view engine setup
app.use(express.static(path.join(__dirname, 'frontend/dist/')));
app.set('views', path.join(__dirname, 'frontend/dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'frontend/dist/')))
//app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ 
  secret: config.sessionsecret,
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use('/', index);
app.use('/Theatre', users);
app.use(function(req, res, next) {
  res.status(404).send('no route configured')
});

module.exports = app;
