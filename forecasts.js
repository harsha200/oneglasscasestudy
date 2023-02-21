const dbLayer = require("./databaselayer");
const {forecastsLogger} = require("./logger");

fetchAllRecords = () => {
    forecastsLogger.info('Fetching all records in Forecasts table');
    return dbLayer.fetchForecastsData();
}

module.exports = { fetchAllRecords};