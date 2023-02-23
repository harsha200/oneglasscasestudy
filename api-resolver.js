const forecasts = require("./middleware/forecasts");
const weather = require("./middleware/weather");
const AlertManager = require("./middleware/alertmanager");
const {LOGGER} = require("./Logs/Config/Logger");

fetchForecasts = (store) => {

    LOGGER.info("api resolver : /forecasted redirecting to forecasts.fetchForecasts");

    return forecasts.fetchForecasts(store);
}

fetchWeather = (store) => {

    LOGGER.info("api resolver : /weatherdata redirecting to weather.fetchWeather");

    return weather.fetchWeather(store);
}

fetchAlerts = (store) => {
    LOGGER.info("api resolver: /alerts redirecting to AlertManager.retrieveAlerts");

    return AlertManager.retrieveAlerts(store);
}

module.exports = {fetchForecasts, fetchWeather,fetchAlerts};