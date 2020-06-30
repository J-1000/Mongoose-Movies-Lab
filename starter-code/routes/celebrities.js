const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/celebrities', (req, res, next) => {  
  Celebrity.find()
    .then((celebrityFromDB) => {
      res.render('celebrities', {celebrityList: celebrityFromDB})
    })
    .catch(err => {
      console.log(err);
    })
});

router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      res.render('show', {showCelebrity: celebrityFromDB});
    }).catch(err => {
      console.log(err);
    });
})

module.exports = router;
