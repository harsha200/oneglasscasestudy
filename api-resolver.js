const forecasts = require("./forecasts");
const weather = require("./weather");
const {LOGGER} = require("./logger");

fetchForecasts = (store, startdate, enddate) => {

    LOGGER.info("api resolver : /forecasted redirecting to forecasts.fetchForecasts");

    return forecasts.fetchForecasts(store,startdate, enddate);
}

fetchWeather = (store, startdate, enddate) => {

    LOGGER.info("api resolver : /weatherdata redirecting to weather.fetchWeather");

    return weather.fetchWeather(store, startdate, enddate);
}

module.exports = {fetchForecasts, fetchWeather};