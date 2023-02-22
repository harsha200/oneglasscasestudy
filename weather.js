const moment = require("moment/moment");
const weatherapi = require("./weatherAPI");
const {WEATHERLOGGER} = require("./logger");

fetchWeather = async (store, startdate, enddate) => {

    WEATHERLOGGER.info('Fetching weather from  visual crossing weather API');

    //Start Date
    const BEGIN_DATE = moment(startdate).format('YYYY-MM-D');

    //End Date
    const LATER_DATE = moment(enddate).format('YYYY-MM-D');

    const DATA_RESPONSE = await weatherapi.fetchWeatherData(store, BEGIN_DATE, LATER_DATE);

    return extractWeatherTemp(DATA_RESPONSE);
}

extractWeatherTemp = (completeWeatherData) => {

    WEATHERLOGGER.info('Extracting temperature from received weather data from visual crossing api');

    var filteredWeatherData = {};

    const DAYS_WEATHER_DATA = completeWeatherData["days"];

    for(let i = 0; i < DAYS_WEATHER_DATA.length; i++)
    {
        console.log(DAYS_WEATHER_DATA[i]["datetime"])

        var averageTemperature = (DAYS_WEATHER_DATA[i]["tempmax"] + DAYS_WEATHER_DATA[i]["tempmin"])/2;

        //forced 2 decimal places
        averageTemperature = Math.floor(averageTemperature*100)/100;

        filteredWeatherData[DAYS_WEATHER_DATA[i]["datetime"]] = averageTemperature.toFixed(2);
    }

    return filteredWeatherData;
}

module.exports = {fetchWeather};