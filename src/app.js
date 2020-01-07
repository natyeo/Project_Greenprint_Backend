var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    "thing": "somethingElse"
  })
});

app.post('/', (req, res) => {
  res.status(200).json({
    "carbon": "9000"
  })
})

module.exports = app;
