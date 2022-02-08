const router = require('express').Router();
const Celebrity = require('../models/celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

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

module.exports = router;
