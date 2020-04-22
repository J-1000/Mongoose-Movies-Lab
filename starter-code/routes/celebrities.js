const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity')

/* GET celebrities page */
router.get('/celebrities', (req, res) => {
  Celebrity.find()
  .then(celebrities => {
    console.log('those are celebrities:', celebrities)
    res.render('celebrities/index', {celebritiesAll: celebrities});
    })
  .catch(err => {
    console.log(err);
    next(err);
 });
});


/* GET show a form */
router.get('/celebrities/new', (req, res) => {
    console.log('this is a new celebrity:');
    res.render('celebrities/new');
})

/* GET Celebrity Details */
router.get('/celebrities/:id', (req, res, next) => {
    const celebrityId = req.params.id;
    //req.params.parameter has to match GET '/movie/:placeholder'
    //The captured values are stored in the req.params object using the parameter names as keys (e.g. req.params.your_parameter_name).
    //btn <a href="movie/{{this._id}}"> is where it first link to the id. After server gets :id,  it assigns to req.params.id.
    Celebrity.findById(celebrityId) //movieID is the const 
        .then(celebrity => {
            console.log('this is a celebrity:', celebrity);
            res.render('celebrities/show', {celebrityInfo: celebrity});
        })
        .catch(err => {
            console.log(err);
            next(err);
         });
  });
  
  
// POST form add
router.post('/celebrities', (req, res) => {
    // use object destructuring
    const { name, occupation, catchPhrase } = req.body;
    // "name: name": 1st name key matches schema; 2nd name comes from const == req.body.name
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
    }).then(celebrity => {
      console.log(`Success ${celebrity} was added to the database`);
      res.redirect(`/celebrities/${celebrity._id}`);
    }).catch(err => {
      console.log(err);
      // logs the error to the console
      next(err);
    });
  });

  //POST form delete
  router.post('/celebrities/:id/delete', (req, res) => {
    const celebrityId = req.params.id;
    Celebrity.findByIdAndRemove({ _id: celebrityId }) 
    // _id is the syntex from mongoDB
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch(err => {
        next(err);
      });
  });

  module.exports = router;