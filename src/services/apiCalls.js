const fetch = require('node-fetch');
const { google_key, carbon_key, google_key_embed_maps, brighter_planet_key } = require('../../config')
var googleMaps = require('@google/maps').createClient({
  key: google_key,
  Promise: Promise
});

async function googleApiCall(req, mode) {
  try {
    const googleMapsQuery = await {
      origin: req.body.from,
      destination: req.body.to,
      units: 'imperial',
      mode: mode
    };

    return new Promise((resolve, reject) => {
      googleMaps.directions(googleMapsQuery, function(err, response) {
        var generatedUrl = `https://www.google.com/maps/embed/v1/directions?key=${google_key_embed_maps}&origin=${googleMapsQuery.origin}&destination=${googleMapsQuery.destination}&mode=${mode}`
        if (response.json.status == "OK"){
          resolve({
            distance: response.json.routes[0].legs[0].distance.text,
            travel_time: response.json.routes[0].legs[0].duration.text,
            mode: mode,
            carbon: 0,
            url: encodeURIComponent(generatedUrl)
          });
        }
        else if (response.json.status == "ZERO_RESULTS") resolve({
          distance: "Not available   ",
          travel_time: "Not available",
          mode: mode,
          carbon: "Not available",
          url: encodeURIComponent(generatedUrl)
        });
        else {
          throw new Error("Bad Google Maps Request")
        }
      });
    });
  } catch (err) {
    console.log(err)
  }
}

async function brighterPlanetApiCall(req) {
  const destination = req.body.to;
  const origin = req.body.from;

  let result = await new Promise((resolve, reject) => {
    fetch(`http://impact.brighterplanet.com/flights.json?destination_airport=${destination}&origin_airport=${origin}&seat_class=economy&trips=1&load_factor=1&key=${brighter_planet_key}`, {
      method: 'post'
    })
    .then(data => data.json())
    .then((json) => {
      console.log(json)
      resolve(json)
    })
  });
  return result;
};

async function returnFinalResponse(results, carUrl, transitUrl, res) {
  try {
    var [responseCar, responseTransit] = await Promise.all([
      fetch(carUrl),
      fetch(transitUrl)
    ])
    var [dataCar, dataTransit] = await Promise.all([
      responseCar.json(),
      responseTransit.json()
    ])

    results.filter(function(item){
      item.mode == 'driving' ? item.carbon = dataCar.carbonFootprint : item.carbon;
      item.mode == 'transit' ? item.carbon = dataTransit.carbonFootprint : item.carbon;
    })

    res.json(results)

  } catch(err) {
    console.log(err)
  }
}

exports.googleApiCall = googleApiCall;
exports.returnFinalResponse = returnFinalResponse;
exports.brighterPlanetApiCall = brighterPlanetApiCall;
