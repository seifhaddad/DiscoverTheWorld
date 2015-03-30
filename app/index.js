/* jshint camelcase:false */

'use strict';

var express = require('express');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
  res.render('home');
});

app.post('/', function(req, res){

});

var port = process.env.PORT || 5001;

app.listen(port, function(){
  console.log('Everything is ready on Port! ' + port);
});
