const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');


router.get('/', (req, res, next) => {
    Celebrity.find()
      .then(allTheCelebritiesFromDB => {
        // console.log('Retrieved celebtrites from DB:', allTheCelebritiesFromDB);
        //console.log(allTheCelebritiesFromDB);
        res.render('celebrities/index', { celebrities: allTheCelebritiesFromDB });
      })
      .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
      });
  });

  router.get('/:celebritiesId', (req, res, next) => {
      //console.log('this is my request log ' + req.params.celebritiesId);
    Celebrity.findById(req.params.celebritiesId)
      .then(theCelebrity => {
        res.render('celebrities/show', { celebrity: theCelebrity });
      })
      .catch(error => {
        console.log('Error while retrieving celebrity details: ', error);
      })
  });

  module.exports = router;