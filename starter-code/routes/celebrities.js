
  
const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res) => {
  // get all the celebs
  Celebrity.find().then(celebritiesList => {
    // render 'celebs' view with the data
    res.render('celebrities/index', {celebrities: celebritiesList,});
  }).catch((error) => {
    console.log(error);
});
});

router.get('/:id', (req, res, next) => {
  //get individual celeb
    Celebrity.findById(req.params.id).then(celebrity => {
      //render each celeb view with the data
        res.render('celebrities/show', {celebrity: celebrity});
    }).catch((error) => {
    console.log(error);
    next();
});
});

router.get('/new', (req, res) => {
  //create new celeb page
  res.render('celebrities/new');
});

router.post('/', (req, res) => {
  //post form for new celeb
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }).then(celebrity => {
    //render view for new celeb
    console.log(`Success ${celebrity} was added to the database`);
    res.redirect(`/celebrities`);
  }).catch(err => {
    console.log(err);
    // logs the error to the console
    next(err);
  });
});

router.post('/:id/delete', (req, res) => {
  Celebrity.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;