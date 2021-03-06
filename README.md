<img src="./docs/_imgs/leaf.png" align="right" />

# Project Greenprint backend API
[![Build Status](https://travis-ci.org/natyeo/Project_Greenprint_Backend.svg?branch=master)](https://travis-ci.org/natyeo/Project_Greenprint_Backend)
![Planet needs saving](https://img.shields.io/badge/planet-needs%20saving-green)

---

# API docs

API hosted at
```
https://project-greenprint-backend.herokuapp.com/
```

Can be used with the following [frontend app](https://github.com/natyeo/Project_Greenprint_Frontend):  
```
https://project-greenprint.herokuapp.com/
```

## Journey

**POST** ```/```

Post request has to contain query parameters in the body of the request formatted as JSON. It must be in the following format:

```
{
    "from": "_starting_point_",
    "to": "_destination_"
}
```

On success, the above will return the data back formatted in JSON:

```
{
    "from": "_starting_point_",
    "to": "_destination_"
}

```

## API local usage

API runs with the following technologies:

  * [Node JS](https://nodejs.org/en/)
  * [Express JS](https://expressjs.com/)

API tested with the following frameworks:

  * [Mocha](https://mochajs.org/)
  * [Chai](https://www.chaijs.com/)


### Setup

API runs with version ```13.5.0``` of Node JS. Check node [documentation](https://nodejs.org/en/download/) for installation instructions.

Clone repository. Once inside the root folder run the following command to install dependencies.

```bash
npm install
```
Set up environment. Inside the root folder run the following command, modified to include your own API keys, in order to be able to run locally.

```bash
touch .env
```
and then inside the .env file add:

```
NODE_ENV=development
PORT=5678

GOOGLE_KEY='YOUR_GOOGLE_API_KEY'
CARBON_KEY='YOUR_TRIP_TO_CARBON_API_KEY'
MONGO_ATLAS_KEY = 'YOUR_MONGOATLAS_USER_PASSWORD'
GOOGLE_KEY_EMBED_MAPS="A_SEPARATE_GOOGLE_API_KEY_FOR_EMBEDDED_MAPS" *
BRIGHTER_PLANET_KEY="YOUR_BRIGHTER_PLANET_API_KEY"
```
*IMPORTANT: ensure that this key is restricted to only receive referrals from the specific frontend app, as the key is included in the url for embedding maps.

To run server locally, type ``` node server.js ```.

Application will run on ```localhost:5678```

###  Installing MongoDB

To run the backend database, you need to install MongoDB. For this, just type on your terminal:
```
brew install mongodb
```
Nice! The next step is creating our database.

```
mongo
> use user
```

### Testing

To run tests, navigate to root folder and run command

```bash
npm test
```
Tests are run using the Mocha testing framework!


## Team

<a href="https://github.com/elfiyang16" target="new"><img src="https://avatars3.githubusercontent.com/u/29664811?s=400&v=4" width="60" height="60" hspace="5" title="Elfi Yang"></a>
<a href="https://github.com/jonesandy" target="new"><img src="https://avatars0.githubusercontent.com/u/26009223?s=400&v=4" width="60" height="60" hspace="5" title="Andy Jones"></a>
<a href="https://github.com/SevenSecrets" target="new"><img src="https://avatars0.githubusercontent.com/u/53475555?s=400&v=4" width="60" height="60" hspace="5" title="Freddie Smith Hughes"></a>
<a href="https://github.com/fahus" target="new"><img src="https://avatars0.githubusercontent.com/u/52044764?s=400&v=4" width="60" height="60" hspace="5" title="Faduma Hussein"></a>
<a href="https://github.com/sarar0" target="new"><img src="https://avatars2.githubusercontent.com/u/45262110?s=400&v=4" width="60" height="60" hspace="5" title="Sara Rancati"></a>
<a href="https://github.com/natyeo" target="new"><img src="https://avatars2.githubusercontent.com/u/49326857?s=400&v=4" width="60" height="60" hspace="5" title="Natalie Yeo"></a>
