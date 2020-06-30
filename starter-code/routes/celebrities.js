const express=require('express'); 
const Celebrity=require('../models/Celebrity'); 
const router=express.Router(); 


router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then((celebsFromDatabase) => {
    console.log("hi")
    res.render('celebrities', {celebList: celebsFromDatabase});
  }) 
  .catch(err => {
    console.log(err); 
  })
}); 


module.exports=router; 