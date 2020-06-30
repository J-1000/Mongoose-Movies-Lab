const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity");

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

router.get("/celebrities/index", (req, res, next) => {
  Celebrity.find()
    .then((celebs) => {
      res.render("celebrities/index", { celebs });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/celebrities/new", (req, res) => res.render("celebrities/new"));

router.post("/celebrities", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    occupation,
    catchPhrase,
  })
    .then((celeb) => {
      Celebrity.find().then((celebs) => {
        res.render("celebrities/index", { celebs });
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("celebrities/new");
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      Celebrity.find().then((celebs) => {
        res.render("celebrities/index", { celebs });
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celeb) => {
      res.render("celebrities/edit", { celeb });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.post("/celebrities/:id", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.updateOne({ _id: req.params.id }, { name, occupation, catchPhrase })
    .then((celeb) => {
      Celebrity.find().then((celebs) => {
        res.render("celebrities/index", { celebs });
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celeb) => {
      console.log(celeb);
      res.render("celebrities/show", { celeb });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
