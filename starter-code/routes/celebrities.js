const express = require('express');
const router = express.Router(); 
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
    console.log(Celebrity);
    Celebrity.find()
    .then(celebritiesFromDatabase => {
        console.log(celebritiesFromDatabase);
        res.render('celebrities/index', { celebrities: celebritiesFromDatabase });
        }).catch(err => {
        console.log(err);
        });

   
  });
  
  router.get('/celebrities/:_id', (req, res) => {
    const celebrityId = req.params._id;
    Celebrity.findById(celebrityId).then(celebrityFromDatabase => {
    res.render('celebrities/show', { celebrity: celebrityFromDatabase });
    }).catch(err => {
    console.log(err);
    });
    });   

module.exports = router; 

