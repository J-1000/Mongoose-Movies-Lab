const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity");

router.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/new", (req, res, next) => {
  const newCelebrity = new Celebrity(req.body);
  newCelebrity
    .save()
    .then(celebrity => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:celebritiesId/edit", (req, res, next) => {
  Celebrity.findById(req.params.celebritiesId)
    .then(theCelebrity => {
      res.render("celebrities/edit", { celebrity: theCelebrity });
    })
    .catch(error => {
      console.log("Error while retrieving celebrity details: ", error);
    });
});

router.post("/:celebritiesId/edit", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.update(
    { _id: req.params.celebritiesId },
    { $set: { name, occupation, catchPhrase } }
  )
    .then(celebrity => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      next(error);
    });
});

router.post("/:celebritiesId/delete", (req, res, next) => {
  //console.log('this is my request log ' + req.params.celebritiesId);
  Celebrity.findByIdAndRemove(req.params.celebritiesId)
    .then(celebrity => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.log("Error while delete celebrity: ", error);
    });
});

router.get("/:celebritiesId", (req, res, next) => {
  //console.log('this is my request log ' + req.params.celebritiesId);
  Celebrity.findById(req.params.celebritiesId)
    .then(theCelebrity => {
      res.render("celebrities/show", { celebrity: theCelebrity });
    })
    .catch(error => {
      console.log("Error while retrieving celebrity details: ", error);
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(allTheCelebritiesFromDB => {
      // console.log('Retrieved celebtrites from DB:', allTheCelebritiesFromDB);
      //console.log(allTheCelebritiesFromDB);
      res.render("celebrities/index", { celebrities: allTheCelebritiesFromDB });
    })
    .catch(error => {
      console.log("Error while getting the celebrities from the DB: ", error);
    });
});

module.exports = router;
