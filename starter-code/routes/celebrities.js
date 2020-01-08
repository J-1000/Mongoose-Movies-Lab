const express = require('express');
const router  = express.Router();

const Celebrity = require('../models/celebrity.js');


  router.get('/new', (req, res, next) =>{
    res.render('celebrities/new');
});
  router.post('/new', (req, res, next) =>{
    const {name, occupation, catchPhrase} = req.body;
    const newCelebrity = new Celebrity({name, occupation, catchPhrase});
    newCelebrity.save()
    .then((celebrity) => {
        res.redirect('/celebrities')
    })
    .catch(error => { res.render('celebrities/new');
    });
});


router.get('/:id/edit', (req, res, next) =>{
  Celebrity.findOne({'_id': req.params.id})
  .then(theCelebrity => {
    res.render('celebrities/edit', {celebrity: theCelebrity});
  })
  .catch(error => {next(error)})
});

router.post('/:id/edit', (req, res, next) =>{
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.update({'_id': req.params.id}, {$set: {name, occupation, catchPhrase}}, {new: true})
  .then((theCelebrity) => {
    res.redirect('/celebrities')
  })
  .catch(error => {next(error)}
  );
});



router.get('/:id', (req, res, next) =>{
    Celebrity.findOne({'_id': req.params.id})
    .then(theCelebrity => {
        res.render('celebrities/show', {celebrity: theCelebrity});
    })
    .catch(error => {next(error)}
    );
});

router.post('/:id/delete', (req, res, next) =>{
  Celebrity.findByIdAndRemove({'_id': req.params.id})
  .then((celebrity) => {
    res.redirect('/celebrities')
  })
  .catch(error => {next(error)}
  );
});

router.get('/', (req, res, next) => {
    Celebrity.find()
      .then(allTheCelebrities => {
        console.log('Retrieved celebrities from DB:', allTheCelebrities);
        res.render('celebrities', { celebrities: allTheCelebrities });
      })
      .catch(error => { next(error)}
    );
  });

  module.exports = router;
  
