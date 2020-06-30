const express = require('express');
const Celebrity = require('../models/Celebrity');
const router = express.Router();

router.get('/', (req, res) => {
    Celebrity.find().then(celeb => {
        res.render('celebrities/index', { celeb: celeb });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/new', (req, res) => {
    res.render('celebrities/new');
  }); 

router.post('/', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    const newCeleb = new Celebrity({ name, occupation, catchPhrase });
    newCeleb.save()
    .then((celeb) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log(error);
      res.redirect('/celebrities/new');
    })
  }); 

router.get('/:id', (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findById(celebId).then(celeb => {
        res.render('celebrities/show', { celeb: celeb });
    }).catch(err => {
        console.log(err);
        next(err);
    });
});

router.post('/:id/delete', (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findByIdAndRemove(celebId).then(celeb => {
        res.redirect('/celebrities');
    }).catch(err => {
        console.log(err);
        next(err);
    });
});

module.exports = router;
