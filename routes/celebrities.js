const router = require("express").Router();
const { routes } = require("../app");
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      console.log(celebritiesFromDB);
      res.render("celebrities/index", { celebritiesList: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/:id", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      res.render("celebrities/show", { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((createdCelebrity) => {
      res.redirect(`/celebrities/${createdCelebrity._id}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/delete/:id", (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findByIdAndDelete(celebrityId)
    .then((deletedCelebrity) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/edit/:id", (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      res.render("celebrities/edit", { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/celebrities/edit/:id", (req, res, next) => {
  const celebrityId = req.params.id;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect(`/celebrities/${celebrityId}`);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("cele");
module.exports = router;
