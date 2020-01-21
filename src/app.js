var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key

});
var app = express();
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

const db = require('../db')
const recordRouter = require('../routes/record-router')
const passport = require("passport");
const userRouter = require('../routes/user-router')
const Api = require('./services/apiCalls');

var allowedOrigins = ['http://localhost:3000',
                      'https://project-greenprint.herokuapp.com/'];

app.use(cors({
  origin: function(origin, callback){
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// app.options('*', cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
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

app.post('/', (req, res) => {
  const driving = Api.googleApiCall(req, 'driving')
  const transit = Api.googleApiCall(req, 'transit')
  const bicycling = Api.googleApiCall(req, 'bicycling')
  const walking = Api.googleApiCall(req, 'walking')

  Promise.all([transit, driving, bicycling, walking]).then((values) => {
    const results = values;
    let drivingDistance
    let transitDistance

    results.filter(function(item){
      item.mode == 'driving' ? drivingDistance = item.distance.slice(0, -3).replace(/,/g,'') : drivingDistance;
      item.mode == 'transit' ? transitDistance = item.distance.slice(0, -3).replace(/,/g,'') : transitDistance;
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
      distance: 42,
      carbon: 0
    },
    {
      mode: "bicycling",
      travel_time: "1 hour",
      distance: 42,
      carbon: 0
    },
    {
      mode: "driving",
      travel_time: "20 minutes",
      distance: 42,
      carbon: 2.30
    },
    {
      mode: "transit",
      travel_time: "10 minutes",
      distance: 42,
      carbon: 0.5
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
