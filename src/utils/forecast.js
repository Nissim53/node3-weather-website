const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a3645b98ff02695806ac45aad382b5d0&query=" + latitude + "," + longtitude

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Canot connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out, it feels like ${body.current.feelslike} degresse out, ${body.current.humidity}% humidity`)
        }
    })
}




  module.exports = forecast