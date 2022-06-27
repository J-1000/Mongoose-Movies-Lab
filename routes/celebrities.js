const router = require("express").Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      // console.log(celebritiesFromDB);
      res.render("celebrities/index", { celebrityList: celebritiesFromDB });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.get("/celebrities/:id", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      // console.log(celebrityFromDB);
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
    // .then(() => {
    .then(() => {
      return Celebrity.find().then((celebritiesFromDB) => {
        // console.log(celebritiesFromDB);
        res.render("celebrities/index", { celebrityList: celebritiesFromDB });
      });
      // res.redirect(`${createdCelebrity._id}`);
    })
    // })
    .catch((err) => {
      next(err);
      res.render("celebrities/new");
    });
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findByIdAndRemove(celebrityId)
    // .then(deletedCelebrity => {
    //   console.log(deletedCelebrity)
    //   res.redirect("celebrities")
    // })
    .then(() => {
      return Celebrity.find()
        .then((celebritiesFromDB) => {
          // console.log(celebritiesFromDB);
          res.render("celebrities/index", { celebrityList: celebritiesFromDB });
        })
        .catch((err) => {
          next(err);
        });
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
  Celebrity.findByIdAndUpdate(celebrityId, {
    name,
    occupation,
    catchPhrase,
  }).then(() => {
    return Celebrity.find()
      .then((celebritiesFromDB) => {
        // console.log(celebritiesFromDB);
        res.render("celebrities/index", { celebrityList: celebritiesFromDB });
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = router;
