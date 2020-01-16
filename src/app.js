var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key, climateneutral_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key

});
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

const db = require('../db')
const recordRouter = require('../routes/record-router')

const passport = require("passport");
const userRouter = require('../routes/user-router')

const Api = require('./services/apiCalls');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("../config/passport")(passport);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
if(process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
      } else {
        next()
      }
    })
  }

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

  app.post('/flights', (req, res) => {
    const flight = Api.brighterPlanetApiCall(req)
    flight.then(function(data) {
      const results = {
        mode: "flying",
        origin: data.characteristics.origin_airport.object.airport.name,
        destination: data.characteristics.destination_airport.object.airport.name,
        distance: (data.decisions.distance_class.object.flight_distance_class.distance / 1.609344).toFixed(0),
        carbon: (data.decisions.carbon.object.value).toFixed(2),
        barrels_of_oil: (data.equivalents.barrels_of_petroleum).toFixed(2)
      }
      res.json(results)
    })
  })

  // Test routes
  app.post('/test-route', (req, res) => {
    res.status(200).json([
      {
        mode: "walking",
        travel_time: "3 hours",
        distance: 8,
        carbon: 0,
        url: "www.google.com"
      },
      {
        mode: "bicycling",
        travel_time: "NOT AVAILABLE",
        distance: "NOT AVAILABLE",
        carbon: "NOT AVAILABLE",
        url: "NOT AVAILABLE"
      },
      {
        mode: "driving",
        travel_time: "20 minutes",
        distance: 10,
        carbon: 2.30,
        url: "www.google.com"
      },
      {
        mode: "transit",
        travel_time: "10 minutes",
        distance: 2,
        carbon: 0.5,
        url: "www.google.com"
      }
    ])
  });

  app.post('/flights/test-route', (req, res) => {
    res.status(200).json({
      mode: "flying",
      origin: "Sydney Bankstown",
      destination: "London City",
      distance: 6482,
      carbon: 10000,
      barrels_of_oil: 34.6142
    })
  });

  app.use('/travel', recordRouter)
  app.use('/user', userRouter)

  module.exports = app;
