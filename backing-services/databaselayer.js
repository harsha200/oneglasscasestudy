const { getClient } = require('./get-client');
const {DATABASELOGGER} = require('../Logs/Config/Logger');

fetchDBConfig = () => {
    DATABASELOGGER.info('Trying to retrieve database config');
    //getting db client connection
    return getClient();
}

fetchForecastsData =  async (beginningDate, endDate, storeName) => {

    const FIRST_DATE = addQuotes(beginningDate);
    let SECOND_DATE = addQuotes(endDate);
    try{
        //Getting DB connection
        const CLIENT = await fetchDBConfig();
        //Executing Query
        const ENTRIES = await CLIENT.query('SELECT * FROM oneglass.forecasts WHERE location = $1 AND date  between $2 and $3' ,[storeName,FIRST_DATE,SECOND_DATE]);
        DATABASELOGGER.info(` ${ ENTRIES.rowCount} row(s) are received`);
        //Closing DB connection
        await CLIENT.end();
        //sending only data
        return ENTRIES.rows;
    }
    catch (e) {
        DATABASELOGGER.error('Exception in running the query -> '+ e);
    }
}

function addQuotes(value){
    return "\'" + value + "\'";
}

module.exports = { fetchForecastsData}
