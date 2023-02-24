const { createLogger, transports, config } = require('winston');

//Different loggers for different subsytems

const LOGGER = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/general.log'})
    ]
});

const FORECASTSLOGGER = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/forecasts.log'})
    ]
});

const WEATHERLOGGER = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/weatherapi.log'})
    ]
})

const DATABASELOGGER = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/database.log'})
    ]
})
module.exports = {
    LOGGER,
    FORECASTSLOGGER,
    WEATHERLOGGER,
    DATABASELOGGER
};