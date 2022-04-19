const router = require("express").Router();
const Celebrity = require("../models/Celebrity");


router.get('/celebrities', (req, res, next) => {
	// get all the books from the db
	Celebrity.find()
		.then(celebrities => {
			console.log(celebrities)
			res.render('celebrities/index', { celebrities })
		})
		.catch(err => {
			next(err)
		})
    })


router.get('/celebrities/:id', (req, res, next) => {
const id = req.params.id

Celebrity.findById(id)
	.then(celebrities => res.render('celebrities/show', { celebrities }))
    .catch(err => {
    next(err)
    })
}); 


router.get('/celebrities/new', (req, res, next) => {
res.render('celebrities/new')
});
	

router.post('/celebrities', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body
	//console.log(name, occupation, catchPhrase)
	Celebrity.create({
		name,
		occupation,
		catchPhrase,
		
	})
		.then(createdCeleb => {
			console.log(createdCeleb)
			res.redirect(`/celebrities/${createdCeleb._id}`)
			// res.render('/celebrities/${ celebrity: createCeleb'})
		})
		.catch(err => {
		next(res.render('celebrities/new')	)
		})
});



module.exports = router; 
