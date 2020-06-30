const express = require('express');
const Celebrity = require('../models/Celebrity');
const { findById } = require('../models/Celebrity');
const router = express.Router();

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrity => res.render('celebrities/index', {celebrity}))
        .catch(error => next())
})

router.get('/celebrities/:id', (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity
        .findById(celebrityId)
        .then(celebrity => res.render('celebrities/show', {celebrity}))
        .catch(error => next())
})

router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new')
})

router.post('/celebrities', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity
        .create({
            name,
            occupation,
            catchPhrase
        })
        .then(celebrity => res.redirect(`/celebrities/${celebrity._id}`))
})


module.exports = router;