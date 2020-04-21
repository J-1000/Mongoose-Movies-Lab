const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res) => {
  Celebrity.find().then((celebrities) =>
    res.render("celebrities", { celebritiesList: celebrities })
  );
});
router.get("/celebrities/new", (req, res) => {
  res.render("celebrities/new");
});
// Iteration 3
router.get("/celebrities/:celebID", (req, res) => {
  const celebID = req.params.celebID;
  Celebrity.findById(celebID).then((celebrity) => {
    res.render("celebrities/show", celebrity);
  });
});

// Iteration 4

router.post("/celebrities/new", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity
    .save()
    .then((celebrity) => {
      console.log(`Success ${celebrity} was added to the database`);
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Iteration 5
router.get("/celebrities/:id/delete", (req, res) => {
  Celebrity.findById(req.params.id);
  Celebrity.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
