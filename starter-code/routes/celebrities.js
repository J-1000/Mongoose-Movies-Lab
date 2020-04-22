const express = require("express");
const app = express.App();
const Celebrity = require("../models/Celebrity");

app.get("/celebrities", (req, res) => {
  Celebrity.find().then((celebrities) => {
    res.render("celebrities", { artistname: celebrities });
  });
});

app.get("/celebrities/:id", (req, res) => {
  Celebrity.findById(req.params.id)
    .then((celebrities) => {
      res.render("celeEdit", { celebrity: celebrities });
    })
    .catch((error) => {
      res.redirect("/celebrities/show");
    });
});

app.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.save({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((celebrity) => {
      console.log("saved successfully");
      res.redirect("/celebrities/show");
    })
    .catch((error) => {
      console.log("error saving");
      res.redirect("/celebrities");
    });
});

app.get("/celebrities/delete/:id", (req, res) => {
  Celebrity.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});
