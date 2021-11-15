const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities/index', {celebrities: celebrities})
        })
        .catch(err => next(err))
});

router.get('/celebrities/add', (req, res, next) => {
    res.render('celebrities/new')
});

router.get('/celebrities/:id/edit', (req, res) => {

    Celebrity.findById(req.params.id)
        .then(celebrity => {
            res.render('celebrities/edit', {celebrity})
        })
        .catch(err => next(err))
});

router.get('/celebrities/:id', (req, res) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => {
            res.render('celebrities/show', {celebrity})
        })
        .catch(err => next(err))
});

router.post('/celebrities', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
        .then(celebrity => {
            res.redirect(`/celebrities/${celebrity._id}`)
        })
        .catch(err => next(err))
});

router.post('/celebrities/:id/delete', (req, res) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => next(err))
});

router.post('/celebrities/:id', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, {name, occupation, catchPhrase}, {new: true})
        .then(() => {
            res.redirect(`/celebrities/${req.params.id}`)
        })
        .catch(err => next(err))
});


module.exports = router;
