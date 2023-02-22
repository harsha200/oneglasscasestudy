const express = require('express');
const apiresolver = require('./api-resolver');

const APP = express();

APP.get("/forecastedsales", async (req, res) => {
  const FORECAST_INFO = apiresolver.fetchForecasts(req.query.store, req.query.startdate, req.query.enddate);
   return  res.json(await FORECAST_INFO);
});

APP.get("/weatherdata", async (req, res) => {
  const WEATHER_INFO = apiresolver.fetchWeather(req.query.store, req.query.startdate, req.query.enddate);
  return  res.json([await WEATHER_INFO]);
});


module.exports = APP;
