const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const apiKey = "137d1596028a05f30f8cf93cc499c500";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity+"%";
        document.querySelector(".wind").innerHTML="Wind Speed :"+data.wind.speed+"Km/hr";
        
        // Change Weather Icon Based on Condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "clouds.jpg";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "clear.jpg";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "rain.jpg";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "drizzle.jpg";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "mist.jpg";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

