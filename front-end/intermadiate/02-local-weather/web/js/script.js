var httpsFixer = 'https://crossorigin.me/';
var tempCelsius;
var tempMinCelsius;
var tempMaxCelsius;

$(document).ready(function() {
    getCoordinates();
});

function getCoordinates() {
    $('#loadingDiv').velocity('transition.slideUpIn');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
            var latitudeParam = '?lat=' + position.coords.latitude;
            var longitudeParam = "&lon=" + position.coords.longitude;
            var unitParam = '&units=metric';
            var appId = '&appid=7af863afa699a3d1e2a8547f2a985df5';
            $.getJSON(httpsFixer + apiUrl + latitudeParam + longitudeParam + unitParam + appId, function(json) {
                fillWeatherData(json);

                $('#loadingDiv').velocity('transition.slideUpOut');

                setTimeout(function() {
                    var el = $('#weatherDiv');
                    el.css('visibility', 'visible');
                    el.velocity('transition.slideUpIn');
                }, 1500);

                setTimeout(function() {
                    var el = $('#place');
                    el.css('visibility', 'visible');
                    el.velocity('transition.slideUpIn');
                }, 2000);

                setTimeout(function() {
                    var el = $('#iconAndTemp');
                    el.css('visibility', 'visible');
                    el.velocity('transition.slideUpIn');
                }, 2500);

                setTimeout(function() {
                    var el = $('#desc');
                    el.css('visibility', 'visible');
                    el.velocity('transition.slideUpIn');
                }, 3000);

            });
        });
    }
}

function fillWeatherData(json) {
    tempCelsius = Math.round(json.main.temp);
    tempMinCelsius = Math.round(json.main.temp_min);
    tempMaxCelsius = Math.round(json.main.temp_max);

    $('#city').html(json.name);
    getCountryName(json.sys.country);
    getIcon(json.weather[0].icon);
    $('#desc').html(capitalizeFirstLetter(json.weather[0].description));
    fillTempsInCelsius();
}

function getCountryName(countryCode) {
    var apiUrl = 'http://country.io/names.json';
    $.getJSON(httpsFixer + apiUrl, function(json) {
        $('#country').html(json[countryCode]);
    });
}

function getIcon(apiIconId) {
    var icon = $('#icon');
    if (apiIconId === '01d') {
        icon.html('<i class="wi wi-day-sunny"></i>');
    } else if (apiIconId === '01n') {
        icon.html('<i class="wi wi-night-clear"></i>');
    } else if (apiIconId === '02d') {
        icon.html('<i class="wi wi-day-cloudy"></i>');
    } else if (apiIconId === '02n') {
        icon.html('<i class="wi wi-night-alt-cloudy"></i>');
    } else if (apiIconId === '03d' || apiIconId === '03n' || apiIconId === '04d' || apiIconId === '04n') {
        icon.html('<i class="wi wi-cloud"></i>');
    } else if (apiIconId === '09d' || apiIconId === '09n') {
        icon.html('<i class="wi wi-showers"></i>');
    } else if (apiIconId === '10d') {
        icon.html('<i class="wi wi-day-showers"></i>');
    } else if (apiIconId === '10n') {
        icon.html('<i class="wi wi-night-alt-showers"></i>');
    } else if (apiIconId === '11d' || apiIconId === '11n') {
        icon.html('<i class="wi wi-lightning"></i>');
    } else if (apiIconId === '13d') {
        icon.html('<i class="wi wi-day-snow"></i>');
    } else if (apiIconId === '13n') {
        icon.html('<i class="wi wi-night-snow"></i>');
    } else if (apiIconId === '50d') {
        icon.html('<i class="wi wi-day-fog"></i>');
    } else if (apiIconId === '50n') {
        icon.html('<i class="wi wi-night-fog"></i>');
    }
}

function fillUnits(unit) {
    var unitVal = unit === 'celsius' ? '°C' : '°F';
    $('#tempUnit').html(unitVal);
    $('#tempMinUnit').html(unitVal);
    $('#tempMaxUnit').html(unitVal);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function fillTempsInCelsius() {
    $('#temp').html(tempCelsius);
    fillUnits('celsius');
    $('#celsius').addClass('disabled');
    $('#fahrenheit').removeClass('disabled');
}

function fillTempsInFahrenheit() {
    $('#temp').html(Math.round(convertToFahrenheit(tempCelsius)));
    fillUnits('fahrenheit');
    $('#celsius').removeClass('disabled');
    $('#fahrenheit').addClass('disabled');
}

function convertToFahrenheit(celsius) {
    return celsius * 9 / 5 + 32;
}