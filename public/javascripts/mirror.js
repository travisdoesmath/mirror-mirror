baseDiv = d3.select("body").append("div")
	.attr("id", "base")
clock = baseDiv.append("div").attr("id", "clock")
weather = baseDiv.append("div").attr("id", "weather")

function getWeatherData() {
	d3.json("./weather", function(error, data) {
		if (error) { console.log(error); alert("An error occurred while attempting to retrieve weather data")};

		weather.text(numeral(data.currently.temperature).format('0') + "°");
	})
}

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var ampm = "am";
	if (h > 12) { ampm = "pm" };
	m = checkTime(m);

	document.getElementById('clock').innerHTML = (h % 12) + ":" + m + " " + ampm;
	var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
	if (i<10) { i = "0" + i};
	return i;
}

startTime();
getWeatherData();


