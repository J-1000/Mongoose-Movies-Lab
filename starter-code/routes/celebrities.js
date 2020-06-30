const express=require('express'); 
const Celebrity=require('../models/Celebrity'); 
const router=express.Router(); 


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
  const celebId=req.params.id; 
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
    console.log(`Success, ${name} was added to the db.`); 
    res.redirect('/celebrities')
  }).catch(err => {
    console.log(err); 
  })
}); 

router.post('/celebrities/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
  .then(() => {
    console.log("A celeb has been deleted")
    res.redirect('/celebrities')
  })
  .catch(err => {
    console.log(err);
  })
}); 


module.exports=router; 