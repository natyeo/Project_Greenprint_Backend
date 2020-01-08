var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var googleMaps = require('@google/maps').createClient({
  key: 
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production routes
app.post('/', (req, res) => {
  res.status(200).json(req.body)
})

// Test routes
app.get('/test-route', (req, res) => {

  googleMaps.directions({
    origin: 'London',
    destination: 'Leeds',
    units: 'imperial'
  }, function(err, response) {
    if (!err) {
        var rawDistance = response.json.routes[0].legs[0].distance.text
         res.send("Your journey is " + rawDistance + "les long!");
         
    } else {
      console.log(err);
    }
  }

  );
});



module.exports = app;
