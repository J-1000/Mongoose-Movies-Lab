
const router = require("express").Router();
const Celebrity = require('../models/celebrity.js')

router.get('/celebrities', (req, res, next) => {
    // getting all the books from the db
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
});


router.get('/celebrities/new',(req,res)=>{
   // to check the page is correct routing
   // res.send('hello new')

   res.render('celebrities/new')
})

router.get('/celebrities/:id/edit', (req, res, next) => {
	Celebrity.findById(req.params.id)
   // editing the celebrities first find the db with id in this method find the celebrities.


		.then(celebritiesFromDB => {
			res.render('celebrities/edit', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
});

router.post('/celebrities/:id/edit', (req, res, next) => {
	const { name,occupation ,catchPhrase } = req.body
    // in this editing the all data and posting the data into the database.
	Celebrity.findByIdAndUpdate(req.params.id, {
		name,
		occupation,
		catchPhrase,
	})
		.then(() => {
			// redirect to the book details page
			res.redirect(`/celebrities/${req.params.id}`)
		})
		.catch(err => next(err))
});



router.post('/celebrities', (req, res, next) => {
	// console.log(req.body)
    // in this it will created celebrties.
	const { name,occupation ,catchPhrase } = req.body
	Celebrity.create({ name,occupation ,catchPhrase })
		.then(createdCelebrity => {
			console.log(createdCelebrity)
			// redirect to '/celebrities/<id of the book>
			res.redirect(`/celebrities/${createdCelebrity._id}`)
			
		})
		.catch(err => next(err))

});




router.post('/celebrities/:id/delete/', (req, res, next) => {
	Celebrity.findByIdAndRemove(req.params.id)
    // In this it will find and remove the celebrities from databse
		.then(() => {
			res.redirect('/celebrities')
		})
		.catch(err => next(err))
});




router.get('/celebrities/:id',(req,res,next)=>{

   const id = req.params.id

   // after created the data and showing them in to detail page in this show page.

   Celebrity.findById(id)
   .then(celebrityFromDb=>{

    console.log(celebrityFromDb)
  
    // res.render('celebrities/details',)
     res.render('celebrities/show',{celebrity:celebrityFromDb})


   })

   .catch(err=>next(err))    
});



module.exports = router;

