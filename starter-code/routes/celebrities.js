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


  
router.get('/celebrities/:id', (req, res, next) => {
    
    Celebrity.findById(req.params.id).then(celebrity => {
        res.render('celebrities/show.hbs', {celebrity: celebrity})
    }).catch(error => {
        console.log('Error', error);
      })
});


router.get('/add', (req, res, next) => {
    res.render('celebrities/new');

});



// router.post('/celebrity', (req, res) => {
//     console.log(req.body); 
//     const { name, occupation, catchPhrase } = req.body;
//     Celebrity.create({
//       name: name,
//       occupation: occupation,
//       catchPhrase: catchPhrase
//     }).then(celebrity => {
//       console.log(`Success! ${name} was added to the database.`);
//       res.redirect(`/books/${celebrity._id}`);
//     }).catch(err => {
//       console.log(err);
//     })
//   })
  
  
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

module.exports = router;