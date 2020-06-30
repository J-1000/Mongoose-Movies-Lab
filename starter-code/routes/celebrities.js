const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

router.get('/celebrities', (req, res, next) => {
    console.log(Celebrity);
    Celebrity.find()
        .then(celebritiesFromDatabase => {
            console.log(celebritiesFromDatabase);
            res.render('celebrities/index', {
                celebrities: celebritiesFromDatabase
            });
        }).catch(err => {
            console.log(err);
        });
});

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})
router.get('/celebrities/:_id/edit', (req, res) => {
    Celebrity.findById(req.params._id)
      .then(celebrity => {
        res.render('celebrities/edit', { celebrity: celebrity })
      }).catch(err => {
        console.log(err);
      });
  })
router.get('/celebrities/:_id', (req, res) => {
    const celebrityId = req.params._id;
    Celebrity.findById(celebrityId).then(celebrityFromDatabase => {
        res.render('celebrities/show', {
            celebrity: celebrityFromDatabase
        });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/celebrities', (req, res) => {
    console.log(req.body);
    const {
        name,
        occupation,
        catchphrase
    } = req.body;
    Celebrity.create({
        name,
        occupation,
        catchphrase
    }).then(celebrity => {
        console.log(`Success! ${name} was added to the database.`);
        res.redirect(`/celebrities/${celebrity._id}`);
    }).catch(err => {
        console.log(err);
    })
})
router.post('/celebrities/:_id/delete', (req, res) => {
    Celebrity.findByIdAndRemove({  _id:req.params._id}  
        )
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
})

router.post('/celebrities/edit/:_id', (req, res) => {
    const { name, occupation, catchphrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params._id, {
     name,occupation,catchphrase
    })
      .then(celebrity => {
        res.redirect(`/celebrities/${celebrity._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  })
module.exports = router;