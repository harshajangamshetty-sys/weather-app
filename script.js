document.addEventListener("DOMContentLoaded" , () => {
    const cityInput = document.querySelector("#city-input")
    const getWeatherButton = document.querySelector("#get-weather-btn")
    const weatherInfo = document.querySelector("#weather-info")
    const cityName = document.querySelector("#city-name")
    const temperature = document.querySelector("#temperature")
    const description = document.querySelector("#description")
    const errorMessage = document.querySelector("#error-message")
    const weather_emoji = document.querySelector('#weather-emoji')
    const container = document.querySelector(".container")
    const weatherEmojis = {
        Thunderstorm: "⛈️",
        Drizzle: "🌦️",
        Rain: "🌧️",
        Snow: "❄️",
        Clear: "☀️",
        Clouds: "☁️",
        Mist: "🌫️",
        Fog: "🌫️",
        Haze: "🌫️",
        Smoke: "💨",
        Dust: "🌪️",
        Sand: "🌪️",
        Ash: "🌋",
        Squall: "💨",
        Tornado: "🌪️"
    };

    getWeatherButton.addEventListener('click' , async() => {
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const data = await fetchWeatherData(city);
            displayWeatherData(data);
        }catch(error) {
            console.error(error)
            showErrorMessage();
        }

    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(`Response Status ${response.status}`);
        }
        
         return await response.json();
    }
    function displayWeatherData(data) {
        const main = data.weather[0].main;
        const emoji = weatherEmojis[main] || '🌡️';
        
        container.dataset.weather = main.toLowerCase();
        cityName.textContent = data.name;
        temperature.textContent = `${data.main.temp} °C`
        weather_emoji.textContent = emoji
        description.textContent = data.weather[0].description
        
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }
    function showErrorMessage () {
        delete document.querySelector(".container").dataset.weather;
        weatherInfo.classList.add('hidden')
        errorMessage.classList.remove('hidden')
    }
}) 