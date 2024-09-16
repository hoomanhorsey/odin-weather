document.addEventListener("DOMContentLoaded", () => {
  // URL (required), options (optional)
  async function getWeather(cityName) {
    console.log(cityName);

    const weatherResult = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=845WSTLXENQ37FGANTMAYK5SM`,
      { mode: "cors" }
    );
    const weatherData = await weatherResult.json();

    console.log(weatherData);
    console.log(weatherData.address);
    console.log(weatherData.currentConditions.temp);

    const weatherDiv = document.getElementById("queryResult");
    weatherDiv.innerHTML =
      weatherData.currentConditions.temp +
      "  " +
      weatherData.address +
      "  " +
      weatherData.currentConditions.icon;
  }

  const userForm = document.getElementById("userForm");

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert(userForm);
    alert(userForm.city.value);

    const cityName = userForm.city.value;

    getWeather(cityName);
  });
});
