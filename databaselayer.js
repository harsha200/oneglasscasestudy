const { getClient } = require('./get-client');
const {databaseLogger} = require('./logger');

fetchDBConfig = () => {
    databaseLogger.info('Trying to retrieve Database config');
    return getClient();
}

fetchForecastsData = async () => {
    const client = await fetchDBConfig();
    const location = process.argv[2] ?? 'Munich';
    const entries = await client.query('SELECT * FROM oneglass.forecasts WHERE location = $1;', [location]);
    databaseLogger.info(`Database entries for  ${entries.rowCount} row(s)`);
    await client.end();

    return entries.rowCount;
}

module.exports = { fetchDBConfig, fetchForecastsData}
