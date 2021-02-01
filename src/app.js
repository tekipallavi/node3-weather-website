const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geolocation');
const forecast = require('./utils/forecast');
const port  = process.env.PORT || 3000;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Pallavi Teki',
        text: 'Use this site to get your weather!!'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pallavi Teki'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        text: 'This is some helpful text.',
        title: 'Help',
        name: 'Pallavi Teki'
    })
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({error: 'Unable to find the location. Try another search'});
    }else{
        geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
            if(error){
                res.send({error: 'Unable to fetch the lat and long'});
            }else{           
              forecast(latitude, longitude, (error,response) => {
                if(error){
                    res.send({error: 'Unable to fetch the forecast'});
                }else{
                    res.send({
                        forecast: response,
                        location: location,
                        address: req.query.address
                    })
                }
              });
            }  
          });
    } 
    
});

app.listen(port, () => {
    console.log('Server is up on port '+ port)
});