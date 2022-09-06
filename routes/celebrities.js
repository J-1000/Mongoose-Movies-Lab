const router = require("express").Router();
const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
	// get all the books from the db
	Celebrity.find()
		.then(celebrities => {
			// console.log(celebrities)
			res.render('celebrities/index', { celebrities })
		})
		.catch(err => next(err))
})

router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new')
});

router.get('/celebrities/:id', (req, res, next) => {

    const celebrityId = req.params.id
    Celebrity.findById(celebrityId).then(celebrity => {
        // console.log(celebrities)
        res.render('celebrities/show', { celebrity })
    })
    .catch(err => next(err))
})

router.post('/celebrities', (req, res, next) => {
	// console.log(req.body)
	const { name, occupation, catchPhrase } = req.body
	Celebrity.create({ name, occupation, catchPhrase })
		.then(createdCelebrity => {
			console.log(createdCelebrity)
			// redirect to '/Celebrities/<id of the Celebritie>
			res.redirect(`/Celebrities/${createdCelebrity._id}`)
			// we could also render the view again and pass
			// the object of the created Celebritie
			// res.render('Celebrities/detail', { Celebritie: createdCelebritie })
		})
		.catch(err => next(err))
});

router.post('/celebrities/:id/delete', (req, res, next) => {
	Celebrity.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect('/celebrities')
		})
		.catch(err => next(err))
});

router.get('/celebrities/:id/edit', (req, res, next) => {
	Celebrity.findById(req.params.id)
		.then(celebrity => {
			res.render('celebrities/edit', { celebrity })
		})
		.catch(err => next(err))
});

router.post('/celebrities/:id', (req, res, next) => {
    console.log('here');
	const { name, occupation, catchPhrase } = req.body
	Celebrity.findByIdAndUpdate(req.params.id, {
        name, occupation, catchPhrase
	})
		.then(() => {
			// redirect to the book details page
			res.redirect(`/celebrities`)
		})
		.catch(err => next(err))
});

module.exports = router;