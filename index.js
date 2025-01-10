import { key as apiKey } from "./key.js"; 
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeather(city);
            displayWeatherInfo(weatherData);
        }
        catch{
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeather(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);
 
    if(!response.ok){
        throw new Error("Unable to fetch data");

    }else{
        return await response.json(); 
    }
};

function displayWeatherInfo(data){

    function kelvinToCelsius(temp){
        const kelvin = 273.15
        
        return  Math.floor(temp - kelvin);
    }

    const {name: city,
           main:{temp, humidity},
           weather: [{description, id}]} = data;

    resetCard(); 

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = `City: ${city}`;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    const convertedTemp = kelvinToCelsius(temp);

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `Temperature: ${convertedTemp}°C`;
    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description;
    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    getWeatherEmoji(id);
};

function getWeatherEmoji(weatherId){
    let emoji

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            emoji = "⛈️"
            break;
        case (weatherId >= 300 && weatherId < 400):
            emoji = "🌧️"
            break;
        case (weatherId >= 500 && weatherId < 600):
            emoji = "⛈️"
            break;
        case (weatherId >= 600 && weatherId < 700):
            emoji = "🌨️"
            break;
        case (weatherId >= 700 && weatherId < 800):
            emoji = "🌫️"
            break;
        case (weatherId === 800):
            emoji = "☀️"
            break;
        case (weatherId >= 801 && weatherId < 810):
            emoji = "☁️"
            break;
        default:
            emoji = "❓";

    }


    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = emoji;
    weatherEmoji.classList.add("weatherEmoji");
     card.appendChild(weatherEmoji);
    
};

function displayError(message){
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    resetCard();

    card.appendChild(errorDisplay);
};

function resetCard(){
    card.textContent = "";
    card.style.display = "flex";
}
