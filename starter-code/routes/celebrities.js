const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');


router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(allCelebsFromDB => {
      res.render('../views/celebrities/index.hbs', { celebrities: allCelebsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the records from the DB: ', error);
    })
});

router.get('/:celebId', (req, res, next) => {
  Celebrity.findById(req.params.celebId)
    .then(element=> {
      res.render('../views/celebrities/show.hbs', { celebrity: element });
    })
    .catch(error => {
      console.log('Error while retrieving details: ', error);
    })
});



module.exports = router;