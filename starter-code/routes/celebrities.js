const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity.js");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrityFromDB) => {
      res.render("celebrities/index.hbs", { celebrities: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
      //console.log("Error while extracting data from model Celebrity", err);
    });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new.hbs");
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchphrase: catchphrase,
  })
    .then((celebrity) => {
      console.log("New celebrity added", celebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.redirect("/celebrities/new");
    });
});

router.post("/celebrities/:id", (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, {
    name: name,
    occupacion: occupation,
    catchphrase: catchphrase,
  })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  const editId = req.params.id;
  Celebrity.findById(editId)
    .then((editCelebrity) => {
      res.render("celebrities/edit", { edit: editCelebrity });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const deleteId = req.params.id;
  Celebrity.deleteOne({ _id: deleteId })
    .then(() => {
      console.log("The celebrity has been deleted");
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityDetails) => {
      //res.send(celebrityDetails);
      res.render("celebrities/show.hbs", { celebrityDetails });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
