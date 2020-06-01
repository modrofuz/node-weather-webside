const request = require ('request')
const geoCode = (city, cb) => {
  const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city + '.json?&access_token=pk.eyJ1IjoibW9kcm9mdXoiLCJhIjoiY2thaTdienpjMDdqdjJyb2RsOXB3Z2dtZSJ9.tEP_W34P02lWBT8ap8XJ1Q&country=sk&limit=1'
  request({ url: urlGeo, json: true}, 
    (error, res) => {
      if (error) {
        cb('Unable to connect', undefined);
      }
      else if (res.body.features.length < 1) {
        cb('Unable to find location', undefined)
      }
      else {
        cb(undefined, 
          {
            lat: res.body.features[0].center[1],
            lon: res.body.features[0].center[0],
            place: res.body.features[0].place_name,
          })
      }
 
  })
}

 module.exports.geoCode = geoCode;
//module.exports = geoCode
