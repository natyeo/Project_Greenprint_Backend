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

// change to ASYNC function when adding API, i.e.: async function flightApiCall() {
async function flightApiCall(req) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", climateneutral_key );
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  const carbonFlight = await fetch(`https://api.goclimateneutral.org/v1/flight_footprint?segments[0][origin]=${req.body.from}&segments[0][destination]=${req.body.to}&currencies[]=USD&cabin_class=economy`, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result.footprint
    })
    .catch(error => console.log('error', error));

    return new Promise((resolve, reject) => {
      resolve({
        distance: "Not available   ",
        travel_time: "Not available",
        mode: 'flying',
        carbon: carbonFlight
      });
    });

}

// Production routes
app.post('/', (req, res) => {
  const driving = Api.googleApiCall(req, 'driving')
  const transit = Api.googleApiCall(req, 'transit')
  const bicycling = Api.googleApiCall(req, 'bicycling')
  const walking = Api.googleApiCall(req, 'walking')

  Promise.all([driving, transit, walking, bicycling, flying]).then((values) => {
    const results = values;
    let drivingDistance
    let transitDistance

    results.filter(function(item){
      item.mode == 'driving' ? drivingDistance = item.distance.slice(0, -3) : drivingDistance;
      item.mode == 'transit' ? transitDistance = item.distance.slice(0, -3) : transitDistance;
    })

    //   if (item.mode == 'driving') {
    //     drivingDistance = item.distance; 
    //   }
    //   else if (item.mode == 'transit') {
    //     transitDistance = item.distance; 
    //   }
    // })

    const carUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${drivingDistance}&activityType=miles&country=def&mode=anyCar&appTkn=${carbon_key}`
    const transitUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${transitDistance}&activityType=miles&country=def&mode=transitRail&appTkn=${carbon_key}`
    // const flightUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${flightDistance}&activityType=miles&country=def&mode=anyFlight&appTkn=${carbon_key}`

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


// http://impact.brighterplanet.com/flights?destination_airport=paris&origin_airport=milan

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

app.use('/travel', recordRouter)
app.use('/user', userRouter)


module.exports = app;
