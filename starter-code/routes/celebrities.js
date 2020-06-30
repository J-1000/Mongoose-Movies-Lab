
const express = require('express');
const Celebs = require('../models/celebrity');
const router  = express.Router();

router.get("/celebrities/:id", (req, res, next) => {
    console.log(req.params.id);
    Celebs.findById(req.params.id)
      .then((celebmodel) => {
        console.log(Celebs);
        res.render("celebrities/show", { celebmodel });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  module.exports = router;