//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request');


function forecast(lat, lon, cb) {
  const url ='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&appid=7aadb594f5ad19ee662155e16c138315&lon='+lon+'&units=metric&lang=sk'
  request({url, json:true}, (err, res) => {
    if (err) {
      cb('Could not connect to weather app')
      console.error();
    } else if (res.body.cod === '400') {
      cb('nothing found for this place')
    } else {
      const data = {
        daily: res.body.daily[0].weather[0].description,
        current: res.body.current,
        temp: res.body.daily[0]
      }
     cb(undefined, data);
    }
  })
}
module.exports.getForecast = forecast;