const {LOGGER} = require("../Logs/Config/Logger");
const forecasts = require("./forecasts");
const weather = require("./weather");
const moment = require("moment");

retrieveAlerts = async (store) => {

    LOGGER.info('Fetching alerts');

    //fetching forecasted sales
    const sales = forecasts.fetchForecasts(store);

    //fetching weather data
    const weatherData = weather.fetchWeather(store);

    const DATES_CLOSE_SALES = checkSalesToClose(await sales);
    const DATES_CLOSE_WEATHER = checkWeatherToClose(await weatherData,await sales);

    const RESPONSE_DATA = buildResponseData(DATES_CLOSE_SALES,DATES_CLOSE_WEATHER);

    return RESPONSE_DATA;

}

buildResponseData = (DATES_CLOSE_SALES, DATES_CLOSE_WEATHER) => {
    const interleavedArray = [];

    const maxLength = Math.max(DATES_CLOSE_SALES.length, DATES_CLOSE_WEATHER.length);

    for (let i = 0; i < maxLength; i++) {
        if (i < DATES_CLOSE_SALES.length) {
            interleavedArray.push(DATES_CLOSE_SALES[i]);
        }
        if (i < DATES_CLOSE_WEATHER.length) {
            interleavedArray.push(DATES_CLOSE_WEATHER[i]);
        }
    }

    return interleavedArray;
}

checkSalesToClose = (salesData) => {

    let triplets = [];

    for (let i = 0; i < salesData.length - 2; i++) {

        let sum = salesData[i].forecasted_sales_quantity + salesData[i+1].forecasted_sales_quantity + salesData[i+2].forecasted_sales_quantity;

        if (sum < 1000) {
                const FIRST_DAY =  moment(salesData[i].date).format('YYYY-MM-D');
                const SECOND_DAY =  moment(salesData[i+1].date).format('YYYY-MM-D');
                const THIRD_DAY =  moment(salesData[i+2].date).format('YYYY-MM-D');
                triplets.push([FIRST_DAY,SECOND_DAY,THIRD_DAY]);
        }

    }
    return triplets;

}

checkWeatherToClose = (weatherData, salesData) => {
        const triplets = [];

        const keys = Object.keys(weatherData);

        for (let i = 0; i <= keys.length - 3; i++) {

            let sum = 0;

            for (let j = i; j < i + 3; j++) {
                sum += salesData[j].forecasted_sales_quantity; // Add the sales quantity to the sum
            }

            if (sum > 1500) {
                continue;
            }

            if (weatherData[i] < 5 && weatherData[i+1] < 5 && weatherData[i+2] < 5) {

                triplets.push([keys[i], keys[i+1], keys[i+2]])
            }
        }

        return triplets;
}
module.exports = {retrieveAlerts}