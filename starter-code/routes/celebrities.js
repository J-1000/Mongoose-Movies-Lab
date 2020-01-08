const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');




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
  
  router.get('/edit', (req, res, next) => {
    Celebrity.findOne({ _id: req.query.celeb_id })
      .then((celeb) => {
        res.render("../views/celebrities/celeb-edit.hbs", { celeb });
      })
      .catch((error) => {
        console.log(error);
      })
  });

  router.post('/edit', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.update({ _id: req.query.celeb_id }, { $set: { name, occupation, catchPhrase } })
      .then((celeb) => {
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
  console.log(`We are in'/' `);
  Celebrity.find()
    .then(allCelebsFromDB => {
      res.render('../views/celebrities/index.hbs', { celebrities: allCelebsFromDB }) ;
    })
    .catch(error => {
      console.log('Error while getting the records from the DB: ', error);
    })
});


//Movies *************************************

router.get('/movies/new', (req, res, next) => {
  Celebrity.find()
    .then(allCelebsFromDB => {
      res.render('../views/celebrities/movies-new.hbs', { celebrities: allCelebsFromDB }) ;
    })
    .catch(error => {
      console.log('Error while getting the records from the DB: ', error);
    })
});


router.post('/movies', (req, res, next) => {
  const newMovie = new Movie(req.body);
  newMovie.save()
    .then((movie) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log(error);
    })
});










module.exports = router;