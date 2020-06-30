const express = require('express');
const Celebrity = require('../models/celebrity');
const router = express.Router();


router.get('/celebrities', (req, res, next) => {
    console.log(Celebrity);
    Celebrity.find()
    
            // -> allTheBooksFromDB is a placeholder, it can be any word
           // |
      .then(allTheCelebritiesFromDB => {
        console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB);
        res.render('celebrities.hbs', {celebrities : allTheCelebritiesFromDB});
      })
      .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
      })
  });





router.get('/add', (req, res, next) => {
    res.render('celebrities/new');

});

  
  
router.post('/celebrities', (req, res, next) => {
    const {  name, occupation, catchPhrase } = req.body;
    const newCelebrity = new Celebrity({  name, occupation, catchPhrase})
    newCelebrity.save()
    .then((celebrity) => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      console.log(error);
    })
  });


router.get('/celebrities/:id/delete', (req, res, next) => {
    console.log("This is req.params.id:", req.params.id)
 
Celebrity.findByIdAndRemove(req.params.id).then(
    res.redirect('/celebrities'))
    .catch((error) => {
        console.log(error);
      })
});
//   Create the /celebrities/:id/delete POST route in your routes/celebrities.js file
// In that route's callback:
// Use the Celebrity model's findByIdAndRemove method to delete the celebrity by its id.
// If there's an error, call the route's next function and return the error
// If there is no error, redirect to the list of celebrities page.

  
router.get('/celebrities/:id', (req, res, next) => {
    
    Celebrity.findById(req.params.id).then(celebrity => {
        res.render('celebrities/show.hbs', {celebrity: celebrity})
    }).catch(error => {
        console.log('Error', error);
      })
});

module.exports = router;