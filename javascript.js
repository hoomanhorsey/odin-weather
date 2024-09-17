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
      console.error(
        "I'm slorry I don't believe there is a city with that name. Could you please try and enter again?" +
          error.status
      );
      alert(
        "I'm slearry I don't believe there is a city with that name. Could you please try and enter again?: \n\n" +
          error
      );
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
