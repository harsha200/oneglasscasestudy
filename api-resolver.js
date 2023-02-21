const {getClient} = require("./get-client");
const {Client} = require("pg");
const forecasts = require("./forecasts");
const {logger} = require("./logger");

fetchForecasts = () => {
    logger.info("api resolver finds fetchAllRecords");
    return forecasts.fetchAllRecords();
}

module.exports = {fetchForecasts};