const router = require("express").Router();
const res = require("express/lib/response");
const Celebrity = require('../models/celebrity')

router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.post('/celebrities', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    })
    .then(
        res.redirect('/celebrities')
    )
    .catch(err => {
        res.render('celebrities/new')
    })
})

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})

router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id
	Celebrity.findById(id)
		.then(celebritieFromDB => {
			console.log(celebritieFromDB)
			res.render('celebrities/show', { celebrities: celebritieFromDB })
		})
		.catch(err => {
			next(err)
		})
})

router.get('/celebrities/edit', (req, res, next) => {
    const id = req.params.id
    Celebrity.findOne(id)
    .then(celebrityFromDB => {
        res.render('celebrities/edit', {celebrities : celebrityFromDB})
    })
    .catch(err => {
        next(err)
    })

})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id
    Celebrity.findByIdAndRemove(id)
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        next(err)
    })
})



router.post('/celebrities/:id', (req, res, next) => {
    const id = req.params.id
    const {name, occupation, catchPhrase} = req.body
    Celebrity.findByIdAndUpdate(id, {
        name,
        occupation,
        catchPhrase
    })
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;