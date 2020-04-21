
  
const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');

router.get('/', (req, res) => {
  // get all the celebs
  Celebrity.find().then(celebritiesList => {
    // render a 'celeb' view with the data
    res.render('celebrities/index', {celebrities: celebritiesList,});
  }).catch((error) => {
    console.log(error);
});
});

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id).then(celebrity => {
        res.render('celebrities/show', {celebrity: celebrity});
    }).catch((error) => {
    console.log(error);
    next();
});
});

module.exports = router;