const express = require('express');
const apiresolver = require('./api-resolver');
var cors = require('cors');
const {validationschema} = require('./Helpers/validationschema');
const {LOGGER} = require("./Logs/Config/Logger");
const APP = express();


APP.options('*', cors())

APP.use(cors());


APP.get("/forecastedsales",[], async (req, res) => {

    //sanitizing query string

    LOGGER.info("Sanitizing query parameters");

    const {error, value} = validationschema.validate(req.query,{abortEarly: false});

    if(error) {
        const ERROR_MESSAGE = error.details.map((d)=>d.message).join('; ');
        LOGGER.error("Error occured while sanitizing" + ERROR_MESSAGE);
        return res.status(400).json({error:ERROR_MESSAGE});
    }

    const STORE = value.store;

    const FORECAST_INFO = apiresolver.fetchForecasts(STORE)

    return  res.json(await FORECAST_INFO);
});

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
