




class Weather {
    constructor(weatherJsonData){
    this.description = weatherJsonData.weather.description;
    this.date = weatherJsonData.valid_date;
    console.log(weatherJsonData);
}
}

module.exports = Weather;