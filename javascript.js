alert("hi");

// URL (required), options (optional)

fetch(
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=845WSTLXENQ37FGANTMAYK5SM",
  { mode: "cors" }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    console.log(response.address);
    console.log(response.currentConditions.temp);
  })
  .catch(function (err) {
    console.log("derp");
  });
