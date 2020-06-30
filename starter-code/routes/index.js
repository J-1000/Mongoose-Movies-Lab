const express = require('express');
const Celebs = require('../models/celebrity');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/celebrities", (req, res) => {
  Celebs.find()
    .then((celebmodel) => {
      console.log(Celebs);
      res.render("celebrities", { CelebList: celebmodel});
    })
    .catch((err) => {
      console.log(err);
    });
});



module.exports = router;
