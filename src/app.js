var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key,
  Promise: Promise
});
const fetch = require('node-fetch');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function googleApiCall(req, mode) {
  const googleMapsQuery = await {
    origin: req.body.from,
    destination: req.body.to,
    units: 'imperial',
    mode: mode
  };

  return new Promise((resolve, reject) => {
    googleMaps.directions(googleMapsQuery, function(err, response) {
      if (!err){
        resolve({
          distance: response.json.routes[0].legs[0].distance.text,
          travel_time: response.json.routes[0].legs[0].duration.text,
          mode: mode,
          carbon: 0
        });
      }
        reject(err);
    });
  });
}

// Production routes
app.post('/', (req, res) => {
  const driving = googleApiCall(req, 'driving')
  const transit = googleApiCall(req, 'transit')
  const bicycling = googleApiCall(req, 'bicycling')
  const walking = googleApiCall(req, 'walking')

  Promise.all([driving, transit, walking, bicycling]).then((values) => {
    const results = values;
    const drivingDistance = values[0].distance.slice(0, -3);
    const transitDistance = values[1].distance.slice(0, -3);
    const carUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${drivingDistance}&activityType=miles&country=gbr&mode=anyCar&appTkn=${carbon_key}`
    const transitUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${transitDistance}&activityType=miles&country=gbr&mode=transitRail&appTkn=${carbon_key}`

    returnFinalResponse(results, carUrl, transitUrl, res)
  })
  .catch(err => console.log(err));
})

async function returnFinalResponse(results, carUrl, transitUrl, res) {
  try {
    var [response1, response2] = await Promise.all([
      fetch(carUrl),
      fetch(transitUrl)
    ])
    var [data1, data2] = await Promise.all([
      response1.json(),
      response2.json()
    ])
    results[0].carbon = data1.carbonFootprint;
    results[1].carbon = data2.carbonFootprint;

    res.json(results)

  } catch(err) {
    console.log(err)
    }
}

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
