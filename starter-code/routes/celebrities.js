
  
const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res) => {
  // get all the celebs
  Celebrity.find().then(celebritiesList => {
    // render a 'celeb' view with the data
    res.render('celebrities/index', {celebrities: celebritiesList,});
  }).catch((error) => {
    console.log(error);
});
});

router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id).then(celebrity => {
        res.render('celebrities/show', {celebrity: celebrity});
    }).catch((error) => {
    console.log(error);
    next();
});
});

router.get('/new', (req, res) => {
  res.render('celebrities/new');
});

router.post('/', (req, res) => {
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase
  }).then(celebrity => {
    console.log(`Success ${celebrity} was added to the database`);
    res.redirect(`/celebrities`);
  }).catch(err => {
    console.log(err);
    // logs the error to the console
    next(err);
  });
});
module.exports = router;