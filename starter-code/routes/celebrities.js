const express = require('express');
const router  = express.Router();
const Celebrity = require("../models/celebrity")


/* GET Celebrities page */
router.get('/celebrities', (req, res, next) => {
  Celebrity
  .find()
  .then(celebrities => 
    res.render('celebrities',{celebrities}))
});

router.get('/celebrities/new', (req, res, next) => {
  res.render("addCelebrity")
})

router.post('/celebrities', (req, res, next) => {
  
  const {name, occupation, catchPhrase} = req.body
  Celebrity
  .create({name, occupation, catchPhrase})
  .then(celebrity => res.redirect(`/celebrities`))

  // 
  
  
})



module.exports = router;
