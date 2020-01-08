const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');



router.get('/new', (req, res, next) => {
    res.render("../views/celebrities/new.hbs");
  });

  router.post('/add', (req, res, next) => {
    const newCeleb = new Celebrity(req.body);
    newCeleb.save()
      .then((celebrity) => {
        res.redirect('/celebrities');
      })
      .catch((error) => {
        console.log(error);
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
  

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(allCelebsFromDB => {
      res.render('../views/celebrities/index.hbs', { celebrities: allCelebsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the records from the DB: ', error);
    })
});






module.exports = router;