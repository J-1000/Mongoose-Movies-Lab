const express = require("express");
const router = express.Router();
const Celebrity = require("../models/celebrity");

// Get celebrites' page
router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            console.log(allCelebrities);
            res.render("celebrities/index", { celebrities: allCelebrities });
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;
