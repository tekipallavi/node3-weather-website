const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c7ba88de2cf8f2d6babfa396516ac3d&query=' + latitude + ',' + longitude + '&units=f';
    request({url : url, json: true}, (error,response) => {
        if(error){
            callback('There is an error in forecast request', undefined);
        }else if(response.body.error){
            callback('Could not fetch the data in forecast request', undefined);
        }else{  
            const temp =  (response.body.current.temperature - 32) * 5/9 ;
            const feelLike =  (response.body.current.feelslike - 32) * 5/9 ;       
            callback(undefined, response.body.current.weather_descriptions+". The temperature now is "+ Math.round(temp) + " but it feels like " + Math.round(feelLike))
        }  
      })    
}

module.exports = forecast;


