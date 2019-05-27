const weatherContainer = document.querySelector(".js-weather");
const API_KEY = 'ac295839c2a65460f83f7236397366ec';
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        ).then(function(response){
            return response.json()
        }).then(function(json){
            console.log(json);
            const weather = json.weather[0].description;
            const place = json.name;
            const wind = json.wind.speed;
            weatherContainer.innerHTML = `place : ${place} @ weather : ${weather} @ wind : ${wind} m/s`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handelGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handelGeoError(position){

}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handelGeoSucces, handelGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        console.log(1)
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}




function init() {
    loadCoords();
}

init();