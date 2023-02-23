const dbLayer = require("../backing-services/databaselayer");
const {FORECASTSLOGGER} = require("../Logs/Config/Logger");
const moment = require("moment");

fetchForecasts = (store) => {
    FORECASTSLOGGER.info('Fetching forecasted sales data from VOIDS database');

    const DATE = new Date();

    //Current Date
    const TODAY_DATE = moment(DATE).format('YYYY-MM-D');

    //Later Date
    const LATER_DATE = moment(TODAY_DATE).add(2,'weeks').format('YYYY-MM-D');

    return dbLayer.fetchForecastsData(TODAY_DATE, LATER_DATE,store);
}

module.exports = { fetchForecasts };