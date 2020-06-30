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
        res.render('celebrity-details.hbs', {celebrity: celebrity})
    }).catch(error => {
        console.log('Error', error);
      })
});
  
module.exports = router;