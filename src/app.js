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

function googleMapsQuery(req, mode) {
  return {
  origin: req.body.from,
  destination: req.body.to,
  units: 'imperial',
  mode: mode
  };
}

function googleApiCall(req, mode) {
  return new Promise((resolve, reject) => {
    googleMaps.directions(googleMapsQuery(req, mode), function(err, response) {
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

async function carbonApiCall(url) {
  let promise = new Promise((res, rej) => {
    fetch(url, {
        method: 'GET'
      })
      .then(function (response) {
        return response
      })
      .catch(function (err) {
        console.log(err)
      })
      .then(function (data) {
        return data.json()
      })
      .catch(function (err) {
        console.log(err)
      })
  })
    let result = await promise;
    return result
  }


// Production routes
app.post('/', (req, res) => {
  const driving = googleApiCall(req, 'driving')
  const bicycling = googleApiCall(req, 'bicycling')
  const walking = googleApiCall(req, 'walking')
  const transit = googleApiCall(req, 'transit')

  Promise.all([driving, transit, walking, bicycling]).then((values) => {
    const results = values;
    let drivingDistance = results[0].distance.slice(0, -3);
    let transitDistance = results[1].distance.slice(0, -3);
    let carUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${drivingDistance}&activityType=miles&country=gbr&mode=anyCar&appTkn=${carbon_key}`
    let transitUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${transitDistance}&activityType=miles&country=gbr&mode=transitRail&appTkn=${carbon_key}`
    const carCarbon = carbonApiCall(carUrl)
    // const transitCarbon = carbonApiCall(transitUrl)
    console.log(carCarbon)
  })
  .then(function(args) {
    console.log(args)
    Promise.resolve(arg)
  })
    // carbonApiCall(transitDistance, transitMode).then(res=> {console.log(res)});
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
