const Weather = require('../models/weather.mod');
const weatherJsonData = require ('../data/weather.json');
const axios = require('axios');
require('dotenv').config();
const Cache = require('../helper/cache');
const { response } = require('express');
const cacheObj = new Cache();

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weatherController = (req, res) =>{
    const lat = req.query.lat;
    const lon = req.query.lon;
    const requestedKey = `weather-${lat}-${lon}`;
    console.log(cacheObj[requestedKey]);
    if (lat && lon){
        if(cacheObj[requestedKey]){
            console.log('Data from the cache');
            res.json(cacheObj[requestedKey]);
        } else {
            const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
            axios.get(weatherBitUrl).then(response =>{
                const responseData =  response.data.data.map(obj => new Weather(obj));
                console.log('Data from API');
                cacheObj[requestedKey] = responseData;
                res.json(responseData)
            }).catch(error => {
                res.send(error.message)
            });
        }
    }else {
        res.send('no lat and lon found!!')
    }
 }

 module.exports = weatherController;