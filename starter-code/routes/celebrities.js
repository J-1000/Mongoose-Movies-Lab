const express = require('express');
const Book = require('../model/Celebrity');
const Celebrity = require('../model/Celebrity');
const router = express.Router();

router.get('/celebrities', (req, res, next) => {
  // get all the celebrities from the database
  Celebrity.find().then(celebritiesFromDatabase => {
    // render a 'books' view with the books data
    // console.log(celebritiesFromDatabase);
   
    res.render('celebrities', { celebritiesList: celebritiesFromDatabase });
  }).catch(err => {
    console.log(err);
  })
});

router.get('/celebrities/:_id', (req, res) => {
    const celebrityId = req.params._id;
    console.log('celebrityId');
    Celebrity.findById(celebrityId).then(celebrityFromDatabase => {
      res.render('celebrities/show', { celebrity: celebrityFromDatabase });
    }).catch(err => {
      console.log(err);
    });
  });

  router.get('/celebrities/new', (req, res) => {
    res.render('celerityForm');
  })


  router.post('/celebrities', (req, res) => {
    console.log(req.body);
    // const title = req.body.title;
    // const author = req.body.author;
    // const description = req.body.description;
    // const rating = req.body.rating;
    const { name, occupation, catchPhrase} = req.body;
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


module.exports = router;