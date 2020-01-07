const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity');

    router.get('/:celebrityId/edit', (req, res, next) => {
        Celebrity.findById(req.params.celebrityId)
        .then((theCelebrity) => {
            res.render('celebrities/edit', { celebrity: theCelebrity });
        })
        .catch(error => {
            console.log('Error while retrieving celebrity details: ', error);
            next(error);
        })
    });

    router.post('/:celebrityId/edit', (req, res, next) => {
        const { name, occupation, catchPhrase } = req.body;
        console.log("_id:", req.params.celebrityId, "body:", req.body);

        Celebrity.update({ _id: req.params.celebrityId}, { $set: { name, occupation, catchPhrase } })
            .then((celebrity) => {
            res.redirect('/celebrities');
            })
            .catch((error) => {
            console.log(error);
            })
        
      });

    router.get('/new', (req, res, next) => {
        res.render("celebrities/new");
    });
  
    router.post('/new', (req, res, next) => {
        
        const newCelebrity = new Celebrity(req.body);
        newCelebrity.save()
        .then((celebrity) => {
            res.redirect('/celebrities');
        })
        .catch((error) => {
            console.log(error);
        })
    });

    router.post('/:celebrityId/delete', (req, res, next) => {
        Celebrity.findByIdAndRemove(req.params.celebrityId)
            .then((celebrity) => {
                res.redirect('/celebrities');
            })
        .catch(error => {
            console.log('Error while deleting celebrity: ', error);
            next(error);
        })
    });

    router.get('/:celebrityId', (req, res, next) => {
        Celebrity.findById(req.params.celebrityId)
        .then(theCelebrity => {
            res.render('celebrities/show', { celebrity: theCelebrity });
        })
        .catch(error => {
            console.log('Error while retrieving celebrity details: ', error);
            next(error);
        })
    });

    router.get('/', (req, res, next) => {
        Celebrity.find()
        .then(allTheCelebritiesFromDB => {
        //console.log('Retrieved books from DB:', allTheCelebritiesFromDB);
        res.render('celebrities/index', { celebrities: allTheCelebritiesFromDB });
        })
        .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
        next(error);
        })
    });


module.exports = router;