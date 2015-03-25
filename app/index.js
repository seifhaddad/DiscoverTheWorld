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
  // var url = 'http://api.wunderground.com/api/d8b5a108b79cf7eb/conditions/q/' + req.body.zip + '.json';
  // request(url, function(err, response, forecast){
  //   forecast = JSON.parse(forecast);
  //   var temperature = forecast.current_observation.temp_f;
  //   var color;
  //
  // if(temperature < 32){
  //   color = 'blue';
  // }else if(temperature > 32 && temperature <= 70){
  //   color = 'green';
  // }else if( temperature > 71 && temperature <= 80){
  //   color = 'yellow';
  // }else if(temperature > 80 && temperature <= 95){
  //   color = 'orange';
  // }else{
  //   color = 'red';
  // }
  //
  // res.render('temp', {zip:req.body.zip, temperature:temperature, color:color});
  // });
});

var port = process.env.PORT || 5001;

app.listen(port, function(){
  console.log('Everything is ready on Port! ' + port);
});
