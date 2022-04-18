const router = require("express").Router();
const Celebrity = require('../models/Celebrity')

router.get("/celebrities", (req, res, next)=> {
	
    Celebrity.find()
          .then(celebrityFromDB => {
              console.log(celebrityFromDB)
              res.render('./celebrities', { celebrities: celebrityFromDB })
          })
          .catch(err => {
              next(err)
          })
  })

  router.get('/celebrities/add', (req, res, next) => {
	res.render('./celebrities/add')
});

  router.get('/celebrities/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findById(id)
		.then(celebrityFromDB => {
			res.render('./celebrities/show', { famoso: celebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
});

router.post('/celebrities', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body
	console.log(name, occupation, catchPhrase)
	Celebrity.create({
		name: name,
		catchPhrase: catchPhrase,
		occupation: occupation,
	})
		.then(createdFamous => {
			console.log(createdFamous)
			//res.redirect(`/celebrities/${createdFamous._id}`)
			 res.render('celebrities', { celebrities: createdFamous })
		})
		.catch(err => {
			next(err)
		})
});


router.get('/celebrities/delete/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findByIdAndDelete(id)
		.then(() => {
			// redirect to the books list
			res.redirect('/celebrities')
		})
		.catch(err => {
			next(err)
		})
});



  module.exports = router;