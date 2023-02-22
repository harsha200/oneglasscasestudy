const config = {
    development: {
        weatherapi: {
            rootUrl: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
            headers: {
                "unitGroup" : "metric",
                "key":"9ME2T3P6MP3CZXWP2QRZAL3QZ",
                "Content-Type": "application/json"
            }
        }
    }
}

module.exports = {config};