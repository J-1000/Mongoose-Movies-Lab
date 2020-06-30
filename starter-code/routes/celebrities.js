const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrityFromDB) => {
      res.render('celebrities', { celebrityList: celebrityFromDB })
    })
    .catch(err => {
      console.log(err);
    })
});

router.post('/celebrities', (req, res) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }).then(celebrity => {
    console.log(`Success! ${name} was added to the database.`);
    res.redirect(`/celebrities/${celebrity._id}`);
  }).catch(err => {
    console.log(err);
  })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('new')
});

router.get('/celebrities/:id', (req, res, next) => {
  const celebrityId = req.params.id;
  Celebrity.findById(celebrityId)
    .then((celebrityFromDB) => {
      res.render('show', { showCelebrity: celebrityFromDB });
    }).catch(err => {
      console.log(err);
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      Celebrity.find()
        .then((celebrityFromDB) => {
          res.render('celebrities', { celebrityList: celebrityFromDB }
          )
        })
        .catch(err => {
          console.log(err);
        })
    })
});

module.exports = router;
