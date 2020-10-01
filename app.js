const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
	var query = req.body.CityName;
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&unit=metric&appid=78febb44b4da9b2de3c57cfd5182408f"
	https.get(url,function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
		const weatherdata = JSON.parse(data);
		const temp = weatherdata.main.temp;
		const weatherDescription = weatherdata.weather[0].description;
		const icon = weatherdata.weather[0].icon;
		const imageURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
		res.write("<p>The weather is currently " + weatherDescription + "</p>");
		res.write("<h1>The temperature currently in " + query + " is "+ temp + " degree celcius ");
		res.write("<br> <img src ="+ imageURL + ">");
		res.send();
	})
	})
})


app.listen(3000, function(){
	console.log("Server is running");
})