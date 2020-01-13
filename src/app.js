var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key } = require('../config');
const Api = require('./services/apiCalls');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Production routes
app.post('/', (req, res) => {
  const driving = Api.googleApiCall(req, 'driving')
  const transit = Api.googleApiCall(req, 'transit')
  const bicycling = Api.googleApiCall(req, 'bicycling')
  const walking = Api.googleApiCall(req, 'walking')

  Promise.all([driving, transit, walking, bicycling]).then((values) => {
    const results = values;
    let drivingDistance
    let transitDistance

    results.filter(function(item){
      item.mode == 'driving' ? drivingDistance = item.distance.slice(0, -3) : drivingDistance;
      item.mode == 'transit' ? transitDistance = item.distance.slice(0, -3) : transitDistance;
    })

    results.forEach(function(item, i){
      item.distance = item.distance.slice(0, -3)
    })

    const carUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${drivingDistance}&activityType=miles&country=def&mode=anyCar&appTkn=${carbon_key}`
    const transitUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${transitDistance}&activityType=miles&country=def&mode=transitRail&appTkn=${carbon_key}`

    Api.returnFinalResponse(results, carUrl, transitUrl, res)
  })
  .catch(err => {
    console.log(err)
    return res.status(400).send({
      error: "Bad Request",
      description: "Have you considered entering more specific locations?"
    })
  });
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
      mode: "bicycling",
      travel_time: "1 hour",
      distance: 8,
      carbon: 0
    },
    {
      mode: "driving",
      travel_time: "20 minutes",
      distance: 10,
      carbon: 2.30
    },
    {
      mode: "transit",
      travel_time: "10 minutes",
      distance: 2,
      carbon: 0.5
    }
  ]})
});

module.exports = app;
