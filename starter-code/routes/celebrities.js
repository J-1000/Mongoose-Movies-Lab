const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');


router.get('/', (req, res, next) => {
    Celebrity.find()
      .then(allTheCelebritiesFromDB => {
        // console.log('Retrieved celebtrites from DB:', allTheCelebritiesFromDB);
        res.render('celebrities/index', { celebrities: allTheCelebritiesFromDB });
      })
      .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
      });
  });

  module.exports = router;