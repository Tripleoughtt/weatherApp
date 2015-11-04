'use strict';

var apiUrl = 'http://api.wunderground.com/api/1d5cbad3ecc470d6/'

$(document).ready(init);


var geoUrl;

function init() {
  $('#getWeather').on('click', getWeather)
  geoUrl = apiUrl + '/geolookup/q/autoip.json'
  $.get(geoUrl)
  .done(function(data){
    console.log(data)
    locData = data
    var city = data.location.city
    var state = data.location.state
    console.log(city)
    console.log(state)
    $('#yourLocation').text('Yo Location: ' + city + ' , ' + state)
    zip = data.location.zip
    console.log(zip)
    var forecastUrl = apiUrl + 'forecast/q/' +zip+ '.json'
    $.get(forecastUrl)
    .done(function(data){
      areaData = data
      updateTodays();
      fiveDay();
    })
  })
}
var zip;
var locData;
var defaultData;
var areaData;
function getWeather(){
  zip = $("#zip").val();
  var forecastUrl = apiUrl + 'forecast/q/' + zip+ '.json';
  geoUrl = apiUrl+ '/geolookup/q/' + zip+ '.json'
  $.get(geoUrl)
  .done(function(data){
    locData = data
  
  $.get(forecastUrl)
  .done(function(data){
    areaData = data;
    updateTodays();
    fiveDay();
  })
  .fail(function(error){
    console.error(error);
  });

})
}

function fiveDay(){
  for(var i = 1; i <= 7; i++){
    var x = i.toString();
    var currForecast = areaData.forecast.txt_forecast.forecastday[i]
    var currIcon = currForecast.icon_url
    var img = $('<img/>', {
      src: currIcon
    });

    var city = locData.location.city
    var state = locData.location.state
    console.log(city)
    console.log(state)
    $('#yourLocation').text('Yo Location: ' + city + ' , ' + state)
    $('.day' + x + ' .icon').empty();
    var currText = currForecast.fcttext
    var currDat = currForecast.title
    $('#day' + x).text(currDat)
    $('.day' + x +' .icon').append(img);
    $('#forecast' + x).append(currText);
  $('.hide').show();
  }
}


function updateTodays(){
    $(".todays .icon").empty();
    console.log(areaData)
    var todaysF = areaData.forecast.txt_forecast.forecastday[0];
    var todaysText = todaysF.fcttext;
    var todaysIcon = $('<img/>', {src: todaysF.icon_url})
    $('.todays .icon').append(todaysIcon);
    $('.forecast').text(todaysText);
}
