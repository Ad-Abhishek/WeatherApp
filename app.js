const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  // console.log(req.body.cityName);
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "fc3571724949f5ec24bb9503b1e086ab";
  const url = "https://api.openweathermap.org/data/2.5/weather?&q="+ query +"&appid="+ apiKey +"&units="+unit;


  https.get(url, function(response) {
    // console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<h1>The temperature in "+ query +" is " + temp + " degree celsius .</h1>");
      res.write("<p>The weather is currently "  + description + "</p>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    })
  })
})

app.listen(3000, function() {
  console.log("server is started at port 3000");
});
