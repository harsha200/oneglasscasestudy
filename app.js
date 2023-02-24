const express = require('express');
const apiresolver = require('./api-resolver');
var cors = require('cors');
const {validationschema} = require('./Helpers/validationschema');
const {LOGGER} = require("./Logs/Config/Logger");
const APP = express();

//Backend - 3000
//Frontend - 3001
//To enable front end to connect backend by enabling cors
APP.options('*', cors())

//API call to retrieve Voids forecasted sales
APP.get("/forecastedsales",[], async (req, res) => {

    //sanitizing query string
    LOGGER.info("Sanitizing query parameters");

    //validating the input query string
    const {error, value} = validationschema.validate(req.query,{abortEarly: false});

    if(error) {
        const ERROR_MESSAGE = error.details.map((d)=>d.message).join('; ');
        LOGGER.error("Error occured while sanitizing" + ERROR_MESSAGE);
        return res.status(400).json({error:ERROR_MESSAGE});
    }

    const STORE = value.store;

    //Once query string validated against, swl injection,ssl attacks, calling api resolver to find apppropriate functiom
    const FORECAST_INFO = apiresolver.fetchForecasts(STORE)

    return  res.json(await FORECAST_INFO);
});

//API call to retreive weather from Visual crosiing weather API
APP.get("/weatherdata", async (req, res) => {

    LOGGER.info("Sanitizing query parameters");

    //sanitizing query string
    const {error, value} = validationschema.validate(req.query,{abortEarly: false});

    if(error) {
        const ERROR_MESSAGE = error.details.map((d)=>d.message).join('; ');
        LOGGER.error("Error occured while sanitizing" + ERROR_MESSAGE);
        return res.status(400).json({error:ERROR_MESSAGE});
    }

    const STORE = value.store;

    const WEATHER_INFO = apiresolver.fetchWeather(STORE);

    return  res.json([await WEATHER_INFO]);
});

//API call to fetch list of dates ONEGLASS can close down their stores bsaed on ther manager conditions met
APP.get("/alerts", async(req, res)=>{

    LOGGER.info("Sanitizing query parameters");

    //sanitizing query string
    const {error, value} = validationschema.validate(req.query,{abortEarly: false});

    if(error) {
        const ERROR_MESSAGE = error.details.map((d)=>d.message).join('; ');
        LOGGER.error("Error occured while sanitizing" + ERROR_MESSAGE);
        return res.status(400).json({error:ERROR_MESSAGE});
    }

    const STORE = value.store;

    const ALERT_INFO = apiresolver.fetchAlerts(STORE);

    return res.json(await ALERT_INFO);
})


module.exports = APP;
