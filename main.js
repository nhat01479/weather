const cityName = $('#cityName');
const weatherState = $('#weatherState');
const weatherIcon = $('#weatherIcon');
const temp = $('#temp');
const sunriseTime = $('#sunriseTime');
const sunsetTime = $('#sunsetTime');
const humidity = $('#humidity');
const windSpeed = $('#windSpeed');

const search = $('#search').val();
const defaultValue = '---';
function getWeather(value) {
    console.log(value);
    if (value == "") {
        value = 'Hue';
    }
    console.log(value);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + value + '&APPID=59ce505ee91f07f3642cd9dfdb7aa4ed&lang=vi&units=metric')
    .then(async (res) => {
        let data = await res.json();
        
        if (data.cod === '404') {
            cityName.text(defaultValue);
            weatherState.text(defaultValue)
            weatherIcon.attr('src', `http://openweathermap.org/img/wn/03d@2x.png`)
            temp.text( defaultValue)
            sunriseTime.text(defaultValue)
            sunsetTime.text(defaultValue)
            humidity.text(defaultValue);
            windSpeed.text(defaultValue);
        } else {
            cityName.text(data.name);
            weatherState.text(data.weather[0].description)
            weatherIcon.attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            temp.text( Math.round(data.main.temp) + '°')
            sunriseTime.text(moment.unix(data.sys.sunrise).format(' HH:mm '))
            sunsetTime.text(moment.unix(data.sys.sunset).format(' HH:mm '))
            humidity.text(data.main.humidity + ' %');
            windSpeed.text(data.wind.speed + ' m/s');
        }
       
    })
    .catch()
}

$(() => {
    getWeather(search)
})
