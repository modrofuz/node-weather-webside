const express = require('express');
const util = require("util");
const path = require('path');
const hbs = require('hbs');

const getGeo = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
// port for heroku || local
const port = process.env.PORT || 3000;

// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlerbars engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  })
})

app.get('/help', (req, res) => {
  // res.sendFile(publicDirectoryPath+'/help.html')
  res.render('help', {
    title: 'Weather App',
    name: 'Andrewm',
    message: 'FY'
  })
})

app.get('/about', (req, res) => {
  /*  console.log('requesting ',util.inspect(req.route.path))
   res.sendFile(publicDirectoryPath+'/about.html') */
  res.render('about', {
    title: 'About me',
    name: 'Andrew Mead'
  })
})

app.get('/weather', (req, res) => {
  let address = req.query.address;
  if (!address) {
    return res.send({
      error: 'Please provide address'
    })
  }
  getGeo.geoCode(address, (error, {lat = '48.36667' , lon = '17.58333', place = 'Trnava' }= {}) => {
    if (error) {
       console.log('ERRRRRRRR', error);
       return res.send({error})
    }    
    forecast.getForecast(lat, lon, (error, forecast) => {
      if (error) {
        console.error('Error occured: ' + error)
        return res.send({error})
      } 
        return res.send({
          forecast: forecast,
          location: place,
          address,
       });
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {

  res.render('404', { title: 'Sorry, page not found', name: 'Andrew Mead', error: 'req.error' })
});

app.listen(port, () => {
  console.log('Server has started on port: ' +port);
});
