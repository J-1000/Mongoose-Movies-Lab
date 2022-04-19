const router = require('express').Router();
const Celebrity = require('../models/Celebrity');

router.get('/celebrities', (req, res, next) => {
    // get all celebrities
    Celebrity.find()
    .then(celebrities => {
        res.render('celebrities/index', {celebrities: celebrities})
    })
    .catch(err => {
        next(err)
    })
})

router.get('/celebrities/new', (req, res, next) => {

    res.render('celebrities/new');

})

router.post('/celebrities', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    })
    .then(createdCelebrity => {
        res.redirect('celebrities');
    })
    .catch(err => {
        res.render('celebrities/new');
    })

})

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
    .then(celebrity => {
        res.render('celebrities/show', {celebrity: celebrity})
    })
    .catch(err => {
        next(err)
    })
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndRemove(id)
    .then(query => {
        res.redirect('/celebrities')
    })
    
    .catch(err => {
        next(err)
    })
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
    .then(celebrity => {
        res.render('celebrities/edit', {celebrity: celebrity})
    })
    .catch(err => {
        next(err)
    })
})

router.post('/celebrities/:id', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    const celebrity = {
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    }

    Celebrity.findByIdAndUpdate(req.params.id, celebrity)
    .then(createdCelebrity => {
        res.redirect('/celebrities');
    })
    .catch(err => {
        res.render('celebrities/new');
    })

})

module.exports = router;
