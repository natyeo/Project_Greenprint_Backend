<img src="./docs/_imgs/leaf.png" align="right" />

# Project Greenprint backend API
[![Build Status](https://travis-ci.org/natyeo/Project_Greenprint_Backend.svg?branch=master)](https://travis-ci.org/natyeo/Project_Greenprint_Backend)
![Planet needs saving](https://img.shields.io/badge/planet-needs%20saving-green)

---

# API docs

API hosted at
```
http://project-greenprint-backend.herokuapp.com/
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

  * [Jest](https://jestjs.io/)
  * [Supertest](https://github.com/visionmedia/supertest)


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
MONGO_ATLAS_KEY = 'YOUR_MONGOATLAST_USER_PASSWORD'
```

To run server locally, type ``` node server.js ```.

Application will run on ```localhost:5678```

###  Installing MongoDB

To run the backend database, you need to install MongoDB. For this, just type on your terminal:
```
brew install mongodb
```
Nice! The next step is creating our database.

```
$ mongo
> use user
```

### Testing

To run tests, navigate to root folder and run command

```bash
npm test
```
