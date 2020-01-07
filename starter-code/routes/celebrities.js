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
  });


router.get('/:id', (req, res, next) =>{
    Celebrity.findOne({'_id': req.params.id})
    .then(theCelebrity => {
        res.render('celebrities/show', {celebrity: theCelebrity});
    })
    .catch(error => {next(error)}
    );
});

  module.exports = router;
  
