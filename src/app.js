const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Def path
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templatates/views");
const partialsPath = path.join(__dirname, "../templatates/partials");

// Setup static dir to serve
app.use(express.static(publicDirPath));

// Setup hbs engine to serve
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Greg"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Greg"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Greg"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }
  geocode(req.query.address, (error, { latitude, longtiude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longtiude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        address: req.query.address,
        location
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }

  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Greg",
    mssg: "Help Page not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Greg",
    mssg: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is Up on 3000");
});
