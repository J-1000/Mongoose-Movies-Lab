const router = require("express").Router();
const Celebrity = require("../models/celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      console.log(celebritiesFromDB);
      res.render("celebrities", { celebrityList: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/add", (req, res, next) => {
  res.render("celebrities/new");
});

router.get("/celebrities/:id", (req, res, next) => {
  console.log(req.params);
  console.log(req.params.id);
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render("celebrities/show", { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      res.redirect(`/celebrities/${createdCelebrity._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId)
    .then((deletedCelebrity) => {
      console.log(deletedCelebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render("celebrities/edit", { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities/:id", (req, res, next) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect(`/celebritys/${celebrityId}`);
    })
    .catch((err) => {
      next(er);
    });
});

module.exports = router;
