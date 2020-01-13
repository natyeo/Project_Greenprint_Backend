var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const { google_key, carbon_key, climateneutral_key } = require('../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key,
  Promise: Promise
});
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

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
    // googleMaps.directions(googleMapsQuery, function(err, response) {
    //   if (!err){
    //     resolve({
    //       distance: response.json.routes[0].legs[0].distance.text,
    //       travel_time: response.json.routes[0].legs[0].duration.text,
    //       mode: mode,
    //       carbon: 0
    //     });
    //   }
    //     reject(err);
    // });

    // DELETE CODE BELOW AND UNCOMMENT CODE ABOVE


    resolve({
            distance: "test",
            travel_time: "test",
            mode: mode,
            carbon: 0
          });
  });
}

// change to ASYNC function when adding API, i.e.: async function flightApiCall() {
async function flightApiCall(req) {
  // const flightsQuery = await {
  //   segments[0][origin]: req.body.from,
  //   segments[0][destination]: req.body.to,
  //   cabin_class: 'economy'
  // };

  // var query = {
  //   "cabin_class": 'economy',
  //   "segments" = [{origin:BCN, destination:ARN}],
  //   "currencies": ["USD"]
  // }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", climateneutral_key );
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("https://api.goclimateneutral.org/v1/flight_footprint?segments[0][origin]=LIN&segments[0][destination]=BCN&currencies[]=USD&cabin_class=economy", requestOptions)
    .then(response => response.json())
    .then(result => {
      console.log(result.footprint)
      return result
    })
    .catch(error => console.log('error', error));

    return new Promise((resolve, reject) => {
      resolve({
        distance: "Not available   ",
        travel_time: "Not available",
        mode: 'flying',
        carbon: 1000
      });
    });

}

// Production routes
app.post('/', (req, res) => {
  const driving = googleApiCall(req, 'driving')
  const transit = googleApiCall(req, 'transit')
  const bicycling = googleApiCall(req, 'bicycling')
  const walking = googleApiCall(req, 'walking')
  const flying = flightApiCall(req)

  Promise.all([driving, transit, walking, bicycling, flying]).then((values) => {
    const results = values;
    let drivingDistance
    let transitDistance
    
    results.filter(function(item) {
      item.distance = item.distance.slice(0, -3);

      if (item.mode == 'driving') {
        drivingDistance = item.distance; 
      }
      else if (item.mode == 'transit') {
        transitDistance = item.distance; 
      }
    })

    const carUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${drivingDistance}&activityType=miles&country=def&mode=anyCar&appTkn=${carbon_key}`
    const transitUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${transitDistance}&activityType=miles&country=def&mode=transitRail&appTkn=${carbon_key}`
    // const flightUrl = `https://api.triptocarbon.xyz/v1/footprint?activity=${flightDistance}&activityType=miles&country=def&mode=anyFlight&appTkn=${carbon_key}`

    returnFinalResponse(results, carUrl, transitUrl, res)

  })
  .catch(err => console.log(err));
})

async function returnFinalResponse(results, carUrl, transitUrl, res) {
  try {
    var [responseCar, responseTransit] = await Promise.all([
      fetch(carUrl),
      fetch(transitUrl)
      // fetch(flightUrl)
    ])
    var [dataCar, dataTransit] = await Promise.all([
      responseCar.json(),
      responseTransit.json()
      // responseFlight.json()
    ])

    results.filter(function(item){
      item.mode == 'driving' ? item.carbon = dataCar.carbonFootprint : item.carbon;
      item.mode == 'transit' ? item.carbon = dataTransit.carbonFootprint : item.carbon;
      // item.mode == 'flying' ? item.carbon = dataFlight.carbonFootprint : item.carbon;
    })

    res.json(results)

  } catch(err) {
    console.log(err)
    }
}

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
