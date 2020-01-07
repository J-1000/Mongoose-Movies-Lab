const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');




/* GET celebrities.hbs */
router.get('/', (req, res, next) => {
  Celebrity.find()
   .then(allCelebritiesFromDB => {
   res.render('celebrities' , {celebrities: allCelebritiesFromDB});
  })
  .catch(error => {
    console.log("Fehler beim holen der Daten aus der DB :", error);
  });
});

router.get('/new', (req,res) => {
    res.render('celebrities/new');
});

router.post('/new', (req, res, next) => {
  console.log(req.body);
  const newCelebrity = new Celebrity(req.body);
  newCelebrity.save()
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.redirect('/celebrities/new');
    });
});

router.get('/:celebrityId', (req, res, next) => {
  Celebrity.findById(req.params.celebrityId)
    .then(theCelebrity => {
      res.render('celebrities/show', { detail: theCelebrity });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req,res,next) => {
  console.log(req.params.id);
    Celebrity.findByIdAndRemove(req.params.id)
    .then(celebrity => {
        res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
  });


module.exports = router;