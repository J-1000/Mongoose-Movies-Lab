const router = require("express").Router()
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
           // console.log(celebritiesFromDB)
            res.render('celebrities', {celebritiesList: celebritiesFromDB})
        })
        .catch(err => {
            next(err)
        })
})

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})

router.get('/celebrities/:id', (req, res, next) => {

	const celebrityId = req.params.id
	Celebrity.findById(celebrityId)
		.then(celebrityFromDB => {
			res.render('celebrities/show', { celebrity: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/celebrities', (req, res, next) => {

	const { name, occupation, catchPhrase } = req.body

	Celebrity.create({
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase
	})

		.then(createdCelebrity => {	
			res.redirect(`/celebrities`)
		})
		.catch(err => {
			res.render('celebrities/new')
		})
});

router.post('/celebrities/delete/:celebrityId', (req, res, next) => {
	const { celebrityId } = req.params;
	// console.log(req.params)
   
	Celebrity.findByIdAndDelete(celebrityId)
	  .then(() => res.redirect('/celebrities'))
	  .catch(error => next(error));
  });

router.get('/celebrities/edit/:id', (req, res, next) => {

	const id = req.params.id

	Celebrity.findById(id)
		.then(celebrityFromDB => {
			// console.log(celebrityFromDB)
			res.render('celebrities/edit', {celebrity: celebrityFromDB})
		})
		.catch(err => {
			next(err)
		})
})

router.post('/celebrities/edit/:id', (req, res, next) => {
	const celebrityId = req.params.id

	const {name, occupation, catchPhrase} = req.body
	Celebrity.findByIdAndUpdate(celebrityId, {name, occupation, catchPhrase})
		.then(() => {
			res.redirect('/celebrities')
		})
		.catch(err => {
			next(err)
		})
})	

module.exports = router