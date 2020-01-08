var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production routes
app.post('/', (req, res) => {
  res.status(200).json({
    walking: {
      mode: "walking",
      travel_time: "3 hours",
      distance: 8,
      carbon: 0
    },
    cycling: {
      mode: "cycling",
      travel_time: "1 hour",
      distance: 8,
      carbon: 0
    },
    car: {
      mode: "car",
      travel_time: "20 minutes",
      distance: 10,
      carbon: 2.30
    }
  })
})

app.get('/', (req, res) => {
  res.status(200).json({
    "thing": "somethingElse"
  })
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
