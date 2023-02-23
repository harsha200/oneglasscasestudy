const config = {
    development: {
        weatherapi: {
            rootUrl: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
            headers: {
                "unitGroup" : "metric",
                "key":"3WWEVYKLNRDJ4DHHK7ASL5XFF",
                "Content-Type": "application/json"
            }
        }
    }
}

module.exports = {config};