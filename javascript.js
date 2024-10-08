document.addEventListener("DOMContentLoaded", () => {
  // URL (required), options (optional)
  async function getWeather(cityName, unit) {
    try {
      console.log(cityName);
      let time1 = performance.now();

      const weatherResult = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${unit}&key=845WSTLXENQ37FGANTMAYK5SM`,
        { mode: "cors" }
      );
      let time2 = performance.now();
      const timeToPerform = (time2 - time1) / 1000;

      if (!weatherResult.ok) {
        throw new Error(`${weatherResult.status}`);
      }
      const weatherData = await weatherResult.json();

      const temp = weatherData.currentConditions.temp;
      const container = document.querySelector(".container");

      if (temp > 35) {
        container.style.backgroundColor = "red";
      } else if (temp < 36 && temp > 30) {
        container.style.backgroundColor = "orange";
      } else if (temp < 31 && temp > 25) {
        container.style.backgroundColor = "lightorange";
      } else if (temp < 26 && temp > 20) {
        container.style.backgroundColor = "yellow";
      } else if (temp < 21 && temp > 10) {
        container.style.backgroundColor = "lightblue";
      } else if (temp < 11 && temp > 0) {
        container.style.backgroundColor = "white";
      } else {
        container.style.backgroundColor = "darkblue";
      }

      console.log(weatherData);

      const weatherDiv = document.getElementById("resultDisplay");
      weatherDiv.innerHTML = `<div>Current temperature in ${weatherData.resolvedAddress} is  
      ${weatherData.currentConditions.temp}. </div><div> Feels like ${weatherData.currentConditions.feelslike}</div>  <div></div> <div>Conditions are:  ${weatherData.currentConditions.icon}. </div> 
      <div> Sunrise is at ${weatherData.currentConditions.sunrise} and sunset at ${weatherData.currentConditions.sunset} </div>
      <div> UV index is ${weatherData.currentConditions.uvindex} out of 10 </div>
      Time to perform operation = ${timeToPerform} seconds.`;
    } catch (error) {
      console.log(error);
      if (error.message === "400") {
        alert(
          "I'm sorry. Internet is telling me that there isn't a city with that name. Could you please re-enter your city name and try again? \n\n" +
            "Bad Gateway: " +
            error.message
        );
      } else if (error.message === "401") {
        alert(
          "I'm sorry. Internet is telling me that your API key isn't valid. Could you please check your credentials \n\n" +
            "Unauthorized: " +
            error.message
        );
      } else if (error.message === "429") {
        alert(
          "I'm sorry. Internet is telling me that the account associated with this service has exceeded it's daily limits. Please check back tomorrow \n\n" +
            "Forbidden: " +
            "Too Many Requests: " +
            error.message
        );
      } else if (error.message === "500") {
        alert(
          "I'm sorry. Internet is telling me that there is a problem with the server. Please check back again later \n\n" +
            "Internal Server Error: " +
            error.message
        );
      } else {
        alert(
          "I'm sorry there seems to be a network error and I could not fulfil your request. Please check your connetion and try again."
        );
      }
    }
  }

  const userForm = document.getElementById("userForm");

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const unit = userForm.unit.value;
    const cityName = userForm.city.value;

    getWeather(cityName, unit);
  });
});
