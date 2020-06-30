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



module.exports=router; 