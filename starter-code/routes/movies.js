const express = require("express");
const app = express.App();
const Celebrity = require("../models/Movies");

app.get("/movies", (req, res) => {
  Celebrity.find().then((movies) => {
    res.render("movies", { movie: celebrities });
  });
});
