const {WEATHERLOGGER} = require("../Logs/Config/Logger");
const axios = require("axios");
const {config} = require("../config/config");

fetchWeatherData = async (store, startDate, endDate) => {

    WEATHERLOGGER.info("Fetching external api to get real time weather data for " + store + " between " + startDate + " and " + endDate);

    try
    {
        try{
            const responseData = await axios.get(buildQuery(store, startDate, endDate),{
                    params: {
                        //This configuration is stored in config file
                        unitGroup : config.development.weatherapi.headers.unitGroup,
                        key: config.development.weatherapi.headers.key,
                    },
                    headers:{
                        "Content-Type": "application/json"
                    },
                }
            ).then( (response) =>{
                return(response.data);
            })
            return responseData;
        }
        catch (error)
        {
            WEATHERLOGGER.error("Error happened while fetching weather data"+ e);
        }

    }
    catch (e)
    {
        WEATHERLOGGER.error('Exception is fetching weather api: ' + e);
    }
}

buildQuery = (store,startDate, endDate) => {

    //building required query format for visual crossing weather api
    const ROOT_URL = config.development.weatherapi.rootUrl;

    const CITY = '/'+ store;

    const BEGIN_DATE = '/'+ startDate;

    const LAST_DATE = '/'+ endDate;

    return ROOT_URL + CITY +  BEGIN_DATE + LAST_DATE;
}

module.exports = {fetchWeatherData};