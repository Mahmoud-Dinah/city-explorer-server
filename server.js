require('dotenv').config();
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const weatherJsonData = require ('./data/weather.json');
const axios = require('axios');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const cors = require('cors');
const { response } = require('express');

app.use(cors()) // after you initialize your express app instance

// a server endpoint 

const PORT = process.env.PORT;

app.get('/weather',(req, res) =>{
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (lat && lon){
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
        axios.get(weatherBitUrl).then(response =>{
            const responseData =  response.data.data.map(obj => new Weather(obj));
            res.json(responseData)
        }).catch(error => {
            res.send(error.message)
        });
    }else {
        res.send('no lat and lon found!!')
    }
 });

 class Weather {
     constructor(weatherJsonData){
     this.description = weatherJsonData.weather.description;
     this.date = weatherJsonData.valid_date;
 }
}
app.listen(PORT) // 