const apikey = "0abbe4d8cf57d38663be0e51ab005cd9";
const url = "https://api.openweathermap.org/data/2.5/";
const city = document.getElementById('cities');
const buttonGetWeather = document.getElementById('buttonGetWeather');
const content = document.getElementById('content');
let checked = "";

async function getWeather () {
    const typeWeather = document.getElementsByName('type_of_weather');
    if (typeWeather[0].checked) {
        checked = typeWeather[0].value;
    } else checked = typeWeather[1].value;
    const weather = await fetch(`${url}${checked}?q=${city.value},BY&appid=${apikey}`);
    const response = await weather.json();
    return response;
}

async function displayWeather() {
    while (content.firstChild) {
        content.removeChild(content.firstChild)
    }

    const weatherData = await getWeather();

    if (weatherData.cod == "404") {
        content.append('Weather for the city is not found');
        return;
    }

    if (checked == 'weather') {
        createWeatherItem(weatherData);
    }

    if (checked == "forecast") {
        const weatherItems = weatherData.list.map(item => {
            createWeatherItem(item);
        })
    }
}

function convertTime (time) {
    if (time) {
        return new Date((time + 10800) * 1000).toISOString().slice(-13, -5);
    } else return "";
}

function convertTemperature (calvin) {
    return (calvin - 273.15).toFixed(1);
}

function createWeatherItem (data) {
    const temperature = convertTemperature(data.main.temp);
    const maxTemp = convertTemperature(data.main.temp_max);
    const minTemp = convertTemperature(data.main.temp_min);
        
    const sunrise = convertTime(data.sys.sunrise);
    const sunset = convertTime (data.sys.sunset);
    
    const iconURL = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    /**Here is creating div which contains icon of weather and name of the city */
    const iconAndCity = document.createElement('div');
    iconAndCity.className = 'icon-and-city';
    const divIcon = document.createElement('div');
    const imgIcon = document.createElement('img');
    imgIcon.setAttribute('src', iconURL);
    divIcon.appendChild(imgIcon);
    const divCity = document.createElement('div');
    divCity.className = 'city-name';
    divCity.append(city.options[city.selectedIndex].text);
    iconAndCity.appendChild(divIcon);
    iconAndCity.appendChild(divCity);
    /**------------------------------ */

    /**Here is creating div which contains max - min temperature */
    const minMaxT = document.createElement('div');
    minMaxT.className = 'min-max-t';
    minMaxT.append(`Range of temperature (min - max): ${minTemp}, C° - ${maxTemp}, C°`);
    /**----------------------------- */

    /**Here is creating div which contains avg temperature, sunrise and sunset, description */
    const tempSunDescription = document.createElement('div');
    tempSunDescription.className = 'temp-sun-description';

    const divTemperature = document.createElement('div');
    divTemperature.className = 'temperature';
    divTemperature.append(`Temperature AVG: ${temperature}, C°`);

    const divsunriseSunset = document.createElement('div');
    divsunriseSunset.className = 'sunrise-sunset';

    const divSunrise = document.createElement('div');
    divSunrise.append(`Sunrise: ${sunrise}`);
    const divSunset = document.createElement('div');
    divSunset.append(`Sunset: ${sunset}`);

    divsunriseSunset.appendChild(divSunrise);
    divsunriseSunset.appendChild(divSunset);

    const divDescription = document.createElement('div');
    divDescription.className = 'description';
    divDescription.append(`Description: ${data.weather[0].description}`);

    tempSunDescription.appendChild(divTemperature);
    tempSunDescription.appendChild(divsunriseSunset);
    tempSunDescription.appendChild(divDescription);
    /**----------------------------- */

    const divAllWeather = document.createElement('div');
    divAllWeather.className = `${checked}-weather`;
    divAllWeather.appendChild(iconAndCity);
    divAllWeather.appendChild(minMaxT);
    divAllWeather.appendChild(tempSunDescription);
    content.appendChild(divAllWeather);

    // if (checked == "weather") {
    //     const divCurrentWeather = document.createElement('div');
    //     divCurrentWeather.className = 'current-weather';
    //     divCurrentWeather.appendChild(iconAndCity);
    //     divCurrentWeather.appendChild(minMaxT);
    //     divCurrentWeather.appendChild(tempSunDescription);
    //     content.appendChild(divCurrentWeather);
    // }

    // if (checked == "forecast") {
    //     const divForecastWeather = document.createElement('div');
    //     divForecastWeather.className = 'forecast-weather';
    //     divForecastWeather.appendChild(iconAndCity);
    //     divForecastWeather.appendChild(minMaxT);
    //     divForecastWeather.appendChild(tempSunDescription);
    //     content.appendChild(divForecastWeather);
    // }
    // content.appendChild(iconAndCity);
    // content.appendChild(minMaxT);
    // content.appendChild(tempSunDescription);
}

buttonGetWeather.addEventListener('click', displayWeather);