var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key,
  Promise: Promise
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production routes
app.post('/', (req, res) => {
  googleMapsQuery = (mode) => {
    return {
    origin: req.body.from,
    destination: req.body.to,
    units: 'imperial',
    mode: mode
    };
  }

  function googleApiCall(mode) {
    return new Promise((resolve, reject) => {
      googleMaps.directions(googleMapsQuery(mode), function(err, response) {
        if (!err){
          resolve({
            distance: response.json.routes[0].legs[0].distance.text,
            duration: response.json.routes[0].legs[0].duration.text,
            mode: mode
          });
        }
          reject(err);
      });
    });
  }

  const driving = googleApiCall('driving')
  const bicycling = googleApiCall('bicycling')
  const walking = googleApiCall('walking')
  const transit = googleApiCall('transit')

  Promise.all([driving, bicycling, walking, transit]).then((values) => {
    const carbonApiCall = values.map(function(type) {
      return {
        activity: type.distance,
        activityType: 'miles',
        mode: type.mode
      }
    })
    res.json(carbonApiCall);
  })
  .catch(err => console.log(err));
})

app.get('/', (req, res) => {
  res.status(200).json({
    "thing": "somethingElse"
  })
})

// Test routes
app.post('/test-route', (req, res) => {
  res.status(200).json({ results: [
    {
      mode: "walking",
      travel_time: "3 hours",
      distance: 8,
      carbon: 0
    },
    {
      mode: "cycling",
      travel_time: "1 hour",
      distance: 8,
      carbon: 0
    },
    {
      mode: "car",
      travel_time: "20 minutes",
      distance: 10,
      carbon: 2.30
    },
    {
      mode: "public transport",
      travel_time: "10 minutes",
      distance: 2,
      carbon: 0.5
    }
  ]})
});

module.exports = app;
