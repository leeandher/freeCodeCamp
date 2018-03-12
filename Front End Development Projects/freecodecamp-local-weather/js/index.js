//Declare variables for unit conversion
var unit = "C";
var currentTemp;

//Toggles extra information
$(".expand").click(function() {
  $(".fa-angle-down").toggleClass('enable');
  $(".extra").toggleClass('override');
});

$("button").click(function() {
  unit = 
    unit == "C" ? "F" : "C";
  currentTemp = 
    unit=="C" ? (currentTemp-32)/1.8 : currentTemp*1.8+32;
  $(".temperature").text(Math.round(currentTemp*10)/10 + String.fromCharCode(176) + unit);
});

function findData() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var userLat = position.coords.latitude;
    var userLon = position.coords.longitude;
    $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + userLat + "&lon=" + userLon,
      function(data) {
        console.log(data);
        currentTemp = Math.round(data.main.temp*10)/10;
        setData(data);
      }
    ); //End .getJSON
  }); //End navigator.geolocation.getCurrentPosition
}

function setData(data) {
  $(".location").text(data.name + ", " + data.sys.country);
  $(".temperature").text(currentTemp + String.fromCharCode(176) + unit);
  $(".category").text(data.weather[0].main);
  setBackground(data.weather[0].main);
  $(".description").text(data.weather[0].description);
  var lat = 
    data.coord.lat >= 0 ?
    data.coord.lat + String.fromCharCode(176) + ' N':
    data.coord.lat*-1 + String.fromCharCode(176) + ' S';
  $(".lat").text(lat);
  var lon = 
    data.coord.lon >= 0 ?
    data.coord.lon + String.fromCharCode(176) + ' E':
    data.coord.lon*-1 + String.fromCharCode(176) + ' W';
  $(".lon").text(lon);
  $(".ws").text(data.wind.speed + ' m/s');
  $(".wd").text(data.wind.deg + String.fromCharCode(176) + ' CW of N');
  $(".hum").text(data.main.humidity + '%');
  $(".pres").text(data.main.pressure + ' hPa');
}

function setBackground(type) {
  switch (type) {
    case 'Mist':
    case 'Drizzle':
      $('.bg').css('background-image','url(https://goo.gl/E85ygx)');
      break;
    case 'Clouds':
      $('.bg').css('background-image','url(https://goo.gl/mcaYzE)');
      break;
    case 'Rain':
      $('.bg').css('background-image','url(https://goo.gl/nB3ybF)');
      break;
    case 'Snow':
      $('.bg').css('background-image','url(https://goo.gl/vmFG2g)');
      break;
    case 'Clear':
      $('.bg').css('background-image','url(https://goo.gl/mG8rQk)');
      break;
    case 'Thunderstorm':
      $('.bg').css('background-image','url(https://goo.gl/82Wn4F)');
      break;
  }
}

$(document).ready(function() {
  if (navigator.geolocation) {
    findData();
  }
});

$(document).ajaxComplete(function() {
  $('.content').removeClass('d-none');
  $('.error').addClass('d-none');
});