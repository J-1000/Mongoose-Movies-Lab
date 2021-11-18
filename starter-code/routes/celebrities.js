const router = require("express").Router();
const Celebrity = require("../models/celebrityModel.js"); // <== add this line before your routes

const {
  Types: { ObjectId },
} = require("mongoose");

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelbFromDB) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render("celebrities/index.hbs", { Celebrities: allCelbFromDB });
    })
    .catch((error) => {
      console.log("it is problem with reading data from db", error);
      next(error);
    });
});

//************************************************** */
router.get("/celebrities/:id", (req, res, next) => {
  const { id } = req.params;
  if (id === "new") {
    console.log("create************************");
    res.render("celebrities/newCell.hbs");
  } else {
    Celebrity.findById(id)
      .then((theCell) => {
        // -> allTheBooksFromDB is a placeholder, it can be any word
        console.log("Retrieved Celebrity from DB:", id);
        // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
        res.render("celebrities/e/show.hbs", { Celebrity: theCell });
      })
      .catch((error) => {
        console.log("it is problem with reading data from db", error);
        next(error);
      });
  }
});

router.post("/celebrities/new", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })

    .then(() =>
      setTimeout(() => {
        res.redirect("/celebrities");
      }, 0)
    )
    .catch((error) => next(error));
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((error) => next(error));
});
//********************************* */
///celebrities/:id/edit
router.get("/celebrities/:id/edit", (req, res) => {
  console.log("Edit!!!!");
  const { id } = req.params;
  Celebrity.findById(id)
    .then((theCell) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved Celebrity from DB:", id);
      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render("celebrities/EditCell.hbs", { Celebrity: theCell });
    })
    .catch((error) => {
      console.log("it is problem with reading data from db", error);
      next(error);
    });
});

router.post("/celebrities/:id", (req, res) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  console.log("Edit!!!!", id, req.body);
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() =>
      setTimeout(() => {
        res.redirect("/celebrities");
      }, 0)
    )
    .catch((error) => next(error));
});

module.exports = router;
