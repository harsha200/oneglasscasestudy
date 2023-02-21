
const { createLogger, format, transports, config } = require('winston');

const logger = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/general.log'})
    ]
});

const forecastsLogger = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/forecasts.log'})
    ]
});

const weatherLogger = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/weatherapi.log'})
    ]
})

const databaseLogger = createLogger({
    levels: config.syslog.levels,
    transports: [
        new transports.Console(),
        new transports.File({filename: './Logs/database.log'})
    ]
})
module.exports = {
    logger: logger,
    forecastsLogger: forecastsLogger,
    weatherLogger: weatherLogger,
    databaseLogger: databaseLogger
};