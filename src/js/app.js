const apikey = "0abbe4d8cf57d38663be0e51ab005cd9";
const url = "https://api.openweathermap.org/data/2.5/";
const city = document.getElementById('cities');
let checked = "";

async function getWeather () {
    const typeWeather = document.getElementsByName('type_of_weather');
    if (typeWeather[0].checked) {
        checked = typeWeather[0].value;
    } else checked = typeWeather[1].value;
    const weather = await fetch(`${url}${checked}?q=`)
}

getWeather();