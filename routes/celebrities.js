
const router = require("express").Router();
const Celebrity = require('../models/celebrity.js')

router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			res.render('celebrities/index', { celebrities: celebritiesFromDB })
		})
		.catch(err => next(err))
});

router.get('/celebrities/new', (req, res, next)=>{


	res.render('celebrities/new',)
});


router.get('/celebrities/:id', (req, res, next) =>{
	const celebritiesId=req.params.id

	Celebrity.findById(celebritiesId)
	.then(celebritiesFromDB=>{
		console.log(celebritiesFromDB)
		res.render('celebrities/show', {celebrities: celebritiesFromDB})
	})
	.catch(err => next(err))
})

router.get('/celebrities/:id/edit', (req,res,next) => {
    Celebrity.findById(req.params.id)
            .then(celebrityFromDB => {
                res.render('celebrities/edit', {celebrity : celebrityFromDB})
            })
            .catch(err => next(err))
})


router.post('/celebrities/:id/edit', (req,res,next) => {
    const { name, occupation, catchPhrase } = req.body
	Celebrity.findByIdAndUpdate(req.params.id, {
		name,
        occupation,
        catchPhrase
	})
		.then(() => {
			res.redirect(`/celebrities/${req.params.id}`)
		})
		.catch(err => next(err))

})
router.post('/celebrities/:id/delete', (req,res,next) => {
    Celebrity.findByIdAndDelete(req.params.id)
            .then(()=> {
                res.redirect('/celebrities')
            })
            .catch(err => next(err))
})



router.post('/celebrities', (req,res,next) => {
    
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
             .then(createdCelebrity => {
                console.log(createdCelebrity)
                res.redirect(`/celebrities/${createdCelebrity._id}`)
             })
             .catch(err => next(err))
})


module.exports=router;