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
            Celebrity.create({
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
router.post('/celebrities/:id/delete', (req,res) => {
    const celebrityId = req.params.id
    Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err);
      next(err);
    })

})

router.get('/celebrities/:id/edit', (req, res) => {
    const celebrityId = req.params.id;
    Celebrity.findById(celebrityId).then(celebrity => {
        res.render('celebrities/edit',{celebrity: celebrity});
    }).catch(err => {
        console.log(err);
        next(err);
    });
});

router.post('/celebrities/:id', (req,res) => {
    const { name, occupation, catchphrase} = req.body;
    const celebrityId = req.params.id;
    Celebrity.findByIdAndUpdate(celebrityId,{
        name,
        occupation,
        catchphrase
    })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      console.log(err);
      next(err);
    });

})




module.exports = router; 

