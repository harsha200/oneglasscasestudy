const dbLayer = require("./databaselayer");
const {FORECASTSLOGGER} = require("./logger");
const moment = require("moment");

fetchForecasts = (store, startdate, enddate) => {
    FORECASTSLOGGER.info('Fetching forecasted sales data from VOIDS database');

    //Current Date
    const TODAY_DATE = moment(startdate).format('YYYY-MM-D');

    //Later Date
    const LATER_DATE = moment(enddate).add(2,'weeks').format('YYYY-MM-D');

    return dbLayer.fetchForecastsData(TODAY_DATE, LATER_DATE,store);
}

module.exports = { fetchForecasts};