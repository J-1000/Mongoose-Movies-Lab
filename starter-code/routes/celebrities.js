const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js');

router.get('/', (req, res, next) => {
    Celebrity.find()
      .then(allTheCelebrities => {
        console.log('Retrieved celebrities from DB:', allTheCelebrities);
        res.render('celebrities', { celebrities: allTheCelebrities });
      })
      .catch(error => { next(error)}
    );
  })

  module.exports = router;
  