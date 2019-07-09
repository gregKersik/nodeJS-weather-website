const request = require("request");

const forecast = (longtiude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/9c2f33afe49b798a18abe3f756f9ef3e/" +
    longtiude +
    "," +
    latitude +
    "?units=si&lang=he";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service!", undefined);
    } else {
      callback(undefined, {
        today: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        rainChance: body.currently.precipProbability,
        tomorow: body.daily.data[1].summary
      });
    }
  });
};

const reverse = str => {
  let split = str.split("");
  let reversed = split.reverse();
  return reversed.join("");
};

module.exports = forecast;
