const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity')

/* GET home page */
router.get('/celebrity/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.findById(id).then(celebrity => 
    res.render("detailsCelebrity", {celebrity})
   )
});

router.get('/celebrity/edit/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.findById(id).then(celebrity => 
    res.render("editCelebrity", {celebrity})
   )
  
});
router.post('/celebrity/edit/:id', (req, res, next) => {
  const id = req.params.id
  const {name, occupation, catchPhrase} = req.body
  Celebrity.findByIdAndUpdate({_id:id}, {name , occupation, catchPhrase})
  .then(result => {
    console.log(result)
    res.redirect(`/celebrity/${id}`)
  })
});

router.get('/celebrity/delete/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.deleteOne({_id:id}).then(result => {console.log(result)
    res.redirect("/celebrities")}
   )
});


module.exports = router;
