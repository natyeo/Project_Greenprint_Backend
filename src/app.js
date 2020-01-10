var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key
});

const db = require('../db')
const userRouter = require('./routes/user-router')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Production routes
app.post('/', (req, res) => {
  googleMaps.directions({
    origin: 'London',
    destination: 'Paris',
    units: 'imperial'
  }, function(err, response) {
    if (!err) {
      var rawDistance = response.json
      res.json(response.json.routes.legs);
    } else {
      console.log(err);
    }
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
      mode: "bicyling",
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
      mode: "walking",
      travel_time: "3 hours",
      distance: 8,
      carbon: 0
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
