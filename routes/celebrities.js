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

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCeleb) => {
      res.redirect(`/celebrities/${createdCeleb._id}`);
    })
    .catch(() => {
      res.redirect('/celebrities/new');
    });
});

router.post('/celebrities/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((err) => next(err));
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Celebrity.findById(id)
    .then((celebFromDB) => {
      res.render('celebrities/edit', { celeb: celebFromDB });
    })
    .catch((err) => next(err));
});

router.post('/celebrities/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const id = req.params.id;
  Celebrity.findByIdAndUpdate(
    id,
    { name, occupation, catchPhrase },
    { new: true }
  )
    .then((celebFromDB) => {
      res.redirect(`/celebrities/${celebFromDB._id}`);
    })
    .catch((err) => next(err));
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
