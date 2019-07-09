const request = require("request");

const geocode = (address, callback) => {
  
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZ2tlcnNpayIsImEiOiJjanhhbG00aGMwNjBqM25tYm1xNXRqMWtzIn0.UIsnAT1MiAxgr18BlODyrw&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the lacation service!", undefined);
    } else if (body.features.length == 0) {
      callback("Unnable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtiude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
