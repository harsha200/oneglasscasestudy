const { Client } = require('pg');
require('dotenv').config();

module.exports.getClient = async () => {

    return new Promise(function(resolve) {
        const CLIENT = new Client({
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            database: process.env.PG_DATABASE,
            ssl: false,
        });
        CLIENT.connect();

        resolve(CLIENT);
    });
};