document.addEventListener('DOMContentLoaded', () => {
    const locationName = document.getElementById('location-name');
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const feelsLike = document.getElementById('feels-like');
    const windSpeed = document.getElementById('wind-speed');
    const humidity = document.getElementById('humidity');
    const uvIndex = document.getElementById('uv-index');
    const visibility = document.getElementById('visibility');
    const pressure = document.getElementById('pressure');
    const forecastContainer = document.getElementById('forecast-container');

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            return fetch(`http://ip-api.com/json/${ip}`);
        })
        .then(response => response.json())
        .then(data => {
            const city = data.city;
            locationName.textContent = city;
            const apiKey = '3174b3d2824a844a920b665a028e02b7';
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        })
        .then(response => response.json())
        .then(data => {
            const current = data.list[0];
            const temperature = current.main.temp;
            const description = current.weather[0].description;
            const feels_like = current.main.feels_like;
            const wind_speed = current.wind.speed;
            const humidity_value = current.main.humidity;
            const pressure_value = current.main.pressure;
            const visibility_value = current.visibility;

            currentTemp.textContent = `${temperature}°C`;
            weatherDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
            feelsLike.textContent = `Feels Like: ${feels_like}°C`;
            windSpeed.textContent = `Wind: ${wind_speed} m/s`;
            humidity.textContent = `Humidity: ${humidity_value}%`;
            pressure.textContent = `Pressure: ${pressure_value} hPa`;
            visibility.textContent = `Visibility: ${visibility_value / 1000} km`;

            //be5od days from index 1 to 6 ya3ne the next 5 days
            const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(1, 6);
            forecastContainer.innerHTML = forecastDays.map(day => `
                <div class="day">
                    <p>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <p>${Math.round(day.main.temp)}°C</p>
                    <p>${Math.round(day.main.temp_min)}°C</p>
                </div>
            `).join('');
        })
       
});
