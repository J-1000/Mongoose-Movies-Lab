const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/movies", (req, res, next) => {
  res.render("index");
});


module.exports = router;
