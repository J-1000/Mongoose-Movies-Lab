const express = require('express'); 
const router = express.Router();
const Celebrity = require('../models/Celebrity'); 

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then((celebsFromDatabase) => {
    console.log(celebsFromDatabase)
    res.render('celebrities', {celebList: celebsFromDatabase});
  }) 
  .catch(err => {
    console.log(err); 
  })
}); 

router.get('/celebrities/:id', (req, res, next) => {
  const celebId = req.params.id; 
  Celebrity.findById(celebId)
  .then((celebsFromDatabase) => {
    res.render('show', {celeb: celebsFromDatabase});
  })
  .catch(err => {
    console.log(err); 
  })
}); 

router.get('/new', (req, res) => {
  res.render('new')
}); 

router.post('/celebrities', (req, res) => {
  const { name, occupation, catchPhrase} = req.body; 
  Celebrity.create ({
    name: name, 
    occupation: occupation,  
    catchPhrase: catchPhrase
  }).then(celeb => {
    console.log(`Celebrity: ${name} was added to the DataBase.`); 
    res.redirect('/celebrities')
  }).catch(err => {
    console.log(err); 
  })
}); 

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    console.log("The chosen celebrity has been deleted")
    res.redirect('/celebrities')
  })
  .catch(err => {
    console.log(err);
  })
}); 

module.exports = router; 