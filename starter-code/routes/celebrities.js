const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render("celebrities", { celebrities: celebrities });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      console.log(celebrity);
      res.render("celebrities/show", { celebrity: celebrity });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities", (req, res, next) => {
  console.log(req);
  let { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(res.redirect("/celebrities"))
    .catch(() => {
      res.render("/celebrities/new");
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndDelete(req.body.id)
    .then(res.redirect("/celebrities"))
    .catch((err) => {
      console.log(err);
      next();
    });
});

module.exports = router;
