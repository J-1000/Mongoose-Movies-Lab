const Movie = require("../models/movieModel.js"); // <== add this line before your routes
const Celebrity = require("../models/celebrityModel.js"); // <== add this line before your routes
const router = require("express").Router();

//****************************************** */
router.get("/movies", (req, res, next) => {
  Movie.find()
    .populate("cast")
    .then((allMovieFromDb) => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log("Retrieved Celebrity from DB:", allMovieFromDb);
      // we call the render method after we obtain the books data from the database -> allTheBooksFromDB
      res.render("movies/showAll.hbs", { movie: allMovieFromDb });
    })
    .catch((error) => {
      console.log("it is problem with reading data from db", error);
      next(error);
    });
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const celebrities = await Celebrity.find();
    if (id === "new") {
      res.render("movies/insertForm.hbs", { celebrities });
    } else {
      const movie = await Movie.findById(id);
      console.log("Retrieved Celebrity from DB:", {
        movie,
        celebrities,
      });
      res.render("movies/editForm.hbs", {
        movie,
        celebrities: celebrities.map((p) => {
          return {
            name: p.name,
            _id: p._id,
            selected: (movie.cast || []).includes(p._id) ? "selected" : "",
          };
        }),
      });
    }
  } catch (error) {
    next(error);
  }
});
//************************************************ */

router.post("/movies", async (req, res, next) => {
  const { title, plot, cast } = req.body;
  console.log({ title, plot, cast });
  await Movie.create({ title, plot, cast });
  res.redirect("/movies");
});

router.post("/movies/:id", async (req, res, next) => {
  try {
    const { title, plot, cast } = req.body;
    const { id } = req.params;
    console.log({ title, plot, cast });
    await Movie.findByIdAndUpdate(id, { title, plot, cast });
  } catch (error) {
    next(error);
  }
  res.redirect("/movies");
});

//***************************************** */
router.post("/movies/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => next(error));
});

module.exports = router;
