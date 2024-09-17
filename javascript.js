document.addEventListener("DOMContentLoaded", () => {
  // URL (required), options (optional)
  async function getWeather(cityName, unit) {
    try {
      console.log(cityName);

      const weatherResult = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=${unit}&key=845WSTLXENQ37FGANTMAYK5SM`,
        { mode: "cors" }
      );

      if (!weatherResult.ok) {
        throw new Error(`${weatherResult.status}`);
      }
      const weatherData = await weatherResult.json();

      console.log(weatherData);
      console.log(weatherData.address);
      console.log(weatherData.currentConditions.temp);

      const weatherDiv = document.getElementById("queryResult");
      weatherDiv.innerHTML = `
      City:   ${weatherData.address}, 
      Temperature: ${weatherData.currentConditions.temp},
      Conditions:
      ${weatherData.currentConditions.icon}`;

      console.log(` City: ${weatherData.address}, 
      Temperature:
      ${weatherData.currentConditions.temp},
      Conditions:
      ${weatherData.currentConditions.icon}`);
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

      console.log(typeof error);
      console.log(error.message);
      console.error(
        "I'm slorry I don't believe there is a city with that name. Could you please try and enter again?" +
          error.status
      );
      // alert(
      //   "I'm slearry I don't believe there is a city with that name. Could you please try and enter again?: \n\n" +
      //     error
      // );
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
