const express = require("express");
const Celebrity = require("../models/Celebrity");
const router = express.Router();
router.get("/celebrities", (req, res) =>{
    Celebrity.find().then(celebritiesFromDataBase => {
        console.log(celebritiesFromDataBase)
        res.render("celebrities", { celebritiesList: celebritiesFromDataBase});
    }).catch(err => {
        console.log(err);
    })
})

router.get("/celebrities/:celebrityId", (req, res) => {
    const celebrityId = req.params.celebrityId;
    Celebrity.findById(celebrityId).then(celebrityFromDatabase => {
      res.render("celebrityDetails", { celebrity: celebrityFromDatabase });
    }).catch(err => {
      console.log(err);
    });
  });

module.exports = router;