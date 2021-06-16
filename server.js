const express = require('express') 
const app = express() 
const weatherController = require('./controllers/weather.cont')
const indexController = require('./controllers/index.controller')
const PORT = process.env.PORT;
const cors = require('cors');
const { response } = require('express');

app.use(cors()) 


app.get('/',indexController);
app.get('/weather',weatherController);


app.listen(PORT)