const request = require('request');
const geocode = (location, callback) => {
 
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +location+ '.json?access_token=pk.eyJ1IjoidGVraXBhbGxhdmkiLCJhIjoiY2tnZHNsbGk0MG01MTJ5bzdhaHR1d3IzZSJ9.Myngq2HHv0_GQPoliGCxqQ';
request({url : url, json: true}, (error, response) => {
    if(error){
        callback('There is an error in geolocation request', undefined);
    }else if(response.body.error){
        callback('Could not fetch the data in geolocation request', undefined);
    }else{
        callback(undefined, {longitude : response.body.features[0].center[0], latitude : response.body.features[0].center[1], location : response.body.features[0].place_name});
    }   
  })

}

module.exports = geocode;