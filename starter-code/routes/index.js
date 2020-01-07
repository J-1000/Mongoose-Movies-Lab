const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(allCelebsFromDB => {
      res.render('celebrities', { celebrities: allCelebsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the records from the DB: ', error);
    })
});



module.exports = router;