const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET Celebrities */
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then(allCelebsFromDB => {
    console.log({celeb: allCelebsFromDB});
    res.render('celebrities/index.hbs', {celeb: allCelebsFromDB});
  })
  .catch(error => {
    console.log(error);
  });
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity.save()
  .then(newCeleb => {
    res.redirect('/celebrities');
  })
  .catch(error => {
    console.log(error);
    res.render('celebrities/new.hbs');
  });
});

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new.hbs');
});

router.get('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove({ '_id': req.params.id })
  .then(oneCelebFromDB => {
    console.log({celeb: oneCelebFromDB});
    res.redirect('/celebrities');
  })
  .catch(error => {
    console.log(error);
  });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  Celebrity.findOne({ '_id': req.params.id })
  .then(oneCelebFromDB => {
    console.log({celeb: oneCelebFromDB});
    res.render('celebrities/edit', {celeb: oneCelebFromDB});
  })
  .catch(error => {
    console.log(error);
  });
});

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.update({_id: req.params.id}, {$set: { name, occupation, catchPhrase }})
  .then(newCeleb => {
    res.redirect('/celebrities');
  })
  .catch(error => {
    console.log(error);
  });
})

router.get('/celebrities/:id', (req, res, next) => {
  Celebrity.findOne({ '_id': req.params.id })
  .then(oneCelebFromDB => {
    console.log({celeb: oneCelebFromDB});
    res.render('celebrities/show.hbs', {celeb: oneCelebFromDB});
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;
