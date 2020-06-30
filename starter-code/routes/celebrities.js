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

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new');
  });
router.get('/celebrities/:_id', (req, res) => {
    const celebrityId = req.params._id;
    Celebrity.findById(celebrityId).then(celebrityFromDatabase => {
    res.render('celebrities/show', { celebrity: celebrityFromDatabase });
    }).catch(err => {
    console.log(err);
    });
    });   




router.post('/celebrities', (req, res) => {
            console.log(req.body);
            const { name, occupation, catchphrase} = req.body;
            Celebrity.save({
                name: name,
                occupation: occupation,
                catchphrase: catchphrase
            })
            .then(celebrity => {
              console.log(`Success! ${name} was added to the database.`);
              res.redirect(`/celebrities`);
            }).catch(err => {
              console.log(err);
              res.redirect('celebrities/new');
            });
          });
          

module.exports = router; 

