
const express = require('express');
const Celebs = require('../models/celebrity');
const router  = express.Router();
const newCeleb = require('../models/celebrity');

//------------------------------------------------------get to new celeb form
router.get("/celebrities/new", (req, res) => {
      res.render("celebrities/new");
});

// ------------------------------------------------------individual celebrity details
router.get("/celebrities/:id", (req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    Celebs.findById(req.params.id)
      .then((celebmodel) => {
        console.log(celebmodel);
        res.render("celebrities/show", { celebmodel });
      })
      .catch((err) => {
        console.log(err);
      })
  });

// ------------------------------------------------------add a celebrity to the list
  router.post("/celebrities/new", (req, res) => {
    console.log("N?E?W?????", req.body);
    const { name, occupation, catchPhrase } = req.body;
    newCeleb.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    }).then((celebmodel) => {
        console.log(`Success! ${name} was added to the database.`);
        res.redirect("/celebrities");
        }).catch((err) => {
        console.log(err);
      })
  })
  


  module.exports = router;

