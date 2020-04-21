const express = require("express");
const router = express.Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find().then((celebrities) => {
    res.render("celebrities", { celebrities });
  });
});

router.get("/celebrities/new", (req, res, next) => {
  // Celebrity.find().then((celebrities) => {
  res.render("celebrities/new");
});
//   });

router.post("/celebrities", (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  // option quick  Celebrity.create({...req.body})
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  }).then((createdCelebrity) => {
    console.log(createdCelebrity);
    res.redirect("/celebrities");
  });
});

router.get("/celebrities/:_id", (req, res) => {
  Celebrity.findById(req.params._id).then((celebrity) => {
    // res.send(celebrity);
    res.render("celebrities/show", { celebrity });
  });
});

router.post("/celebrities/delete/:_id", (req, res, next) => {
  Celebrity.deleteOne({
    _id: req.params._id,
  }).then(() => {
    res.redirect("/celebrities");
  });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  // const { name, occupation, catchPhrase } = req.body;
  Celebrity.findById(req.params.id).then((celebrity) => {
    // res.send(_id);
    res.render("celebrities/edit", { cele: celebrity });
  });
});

router.post("/celebrities/:id", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log(req.body);
  Celebrity.updateOne(
    { _id: req.params.id },
    {
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    }
  ).then((cele) => {
    res.redirect("/celebrities");
  });
});

module.exports = router;
