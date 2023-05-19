const apiKey = "f6473ca79395bb6ab6fbd9999f1dea45";
const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInput.value;
    getWeatherData(city)
});

async function getWeatherData(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("Network Failed");
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,    
        ];
        weatherData.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherData.querySelector(
            ".temperature").textContent = `${temperature}°C`;
        weatherData.querySelector(
            ".description").textContent = `${description}`
            weatherData.querySelector(
                ".details").innerHTML = details.map((details) =>
                `<div>${details}</div>`).join("");
    }

    catch(error){
        weatherData.querySelector(".icon").innerHTML = ""
        weatherData.querySelector(
            ".temperature").textContent = "";
        weatherData.querySelector(
            ".description").textContent = "An error happened. Please try again later"
            weatherData.querySelector(
                ".details").innerHTML = "";
    }
}