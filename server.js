require('dotenv').config();
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const data = require ('./data/weather.json')
const cors = require('cors');

app.use(cors()) // after you initialize your express app instance

// a server endpoint 

const PORT = process.env.PORT;

app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
    res.json(data) // our endpoint function response
})

app.listen(PORT) // kick start the express server to work