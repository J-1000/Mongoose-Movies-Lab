const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.js");

/* GET home page */
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((data) => {
      res.render("celebrities/index.hbs", { celebrities: data });
    })
    .catch((err) => {
      next(err);
    });
});
router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((data) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});
router.post("/celebrities/:id/delete", (req, res, next) => {
  console.log("err");
  Celebrity.findByIdAndRemove(req.params.id)
    .then((data) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  Celebrity.findById(req.params.id).then((data) => {
    res.render("celebrities/edit", { celebrities: data });
  });
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    $set: { name, occupation, catchPhrase },
  })
    .then((data) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});
router.get("/celebrities/:id", (req, res, next) => {
  console.log("markus");
  Celebrity.findById(req.params.id)
    .then((data) => {
      res.render("celebrities/show", { celebrities: data });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
