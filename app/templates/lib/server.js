/*
 * <%= props.name %>
 * <%= props.homepage %>
 *
 * Copyright (c) <%= currentYear %> <%= props.authorName %>
 * Licensed under the <%= props.license %> license.
 */

'use strict';

var express = require('express')
  , http = require('http')
  , prerenderer = require("connect-prerenderer")
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , env = require('node-env-file')
  ;

// Load process.env variables
env(__dirname + '/.env');

var app = express();

app.configure(function(){
  // Basics
  app.set('port', 80);
  app.use(prerenderer());
  app.use(express.static(__dirname + '/public'));
  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(express.session({ secret: 'gobbledygook' }));
});

// Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Setup routing
app.use(app.router);
require('./config/routes')(app, passport);

server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});