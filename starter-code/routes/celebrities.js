const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js');




router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .catch(error => {
            console.log('Error: ', error);
        })
        .then(allCelebrities => {
            console.log('hello' + allCelebrities)
            res.render('celebrities', {
                celebrities: allCelebrities
            });
        })
});

router.post('/celebrities', (req, res, next) => {
    const {
        name,
        occupation,
        catchphrase
    } = req.body;
    const newCelebrity = new Celebrity({
        name,
        occupation,
        catchphrase
    });
    newCelebrity.save()
        .catch((error) => {
            res.render('celebrities/new');
            console.log(error);
        })
        .then((oneCelebrity) => {
            res.redirect('/celebrities');
        })
});

router.get('/celebrities/:id', (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findById(celebId)
        .catch(error => {
            console.log('Error: ', error);
            next();
        })
        .then(oneCelebrity => {
            res.render('show', {
                celebrities: oneCelebrity
            });
        })
});

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
});

router.post('/celebrities/:id/delete', (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findByIdAndRemove(celebId)
        .catch(error => {
            console.log('Error: ', error);
            next();
        })
        .then((oneCelebrity) => {
            res.redirect('/celebrities');
        })
});



module.exports = router;