const router = require('express').Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebsFromDB) => {
      // console.log(celebsFromDB);
      res.render('celebrities/index', {
        celebs: celebsFromDB,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/celebrities/:id', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebFromDB) => {
      console.log(celebFromDB);
      res.render('celebrities/show', {
        celeb: celebFromDB,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
