const router = require("express").Router();
const Celebrity = require('../models/Celebrity');
const Song = require("../models/Songs");

router.get("/celebrities", (req, res, next)=> {
	
    Celebrity.find()
          .then(celebrityFromDB => {
				Song.find()
					.then(songFromDB => {
            		  res.render('./celebrities', { celebrities: celebrityFromDB ,
													song: songFromDB})
          })})
          .catch(err => {
              next(err)
          })
  })

  router.get('/celebrities/add', (req, res, next) => {
	res.render('./celebrities/add')
});

router.get('/song/add2', (req, res, next) => {
	Celebrity.find()
	.then(CelebrityFromDB => {
		console.log(CelebrityFromDB)
		res.render('./celebrities/add2', { famoso: CelebrityFromDB })
	})
});

router.post('/song', (req, res, next) => {
	// create the book in the db
	const { tittle, genre, lyric } = req.body
	console.log(tittle, genre, lyric)
	Song.create({
		tittle: tittle,
		genre: genre,
		lyric: lyric,
	})
		.then(createdSong => {
			console.log(createdSong)
			res.redirect(`/celebrities/${createdSong._id}`)
			// res.render('book', { book: createdBook })
		})
		.catch(err => {
			next(err)
		})
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

router.get('/celebrities/edit/:id', (req, res, next) => {
	// get this book from the db
	const id = req.params.id
	Celebrity.findById(id)
		.then(CelebrityFromDB => {
			res.render('./celebrities/edit', { famoso: CelebrityFromDB })
		})
		.catch(err => {
			next(err)
		})
});


router.post('/celebrities/edit/:id', (req, res, next) => {
	const { name, occupation, catchPhrase } = req.body
	const id = req.params.id
	// update this book in the db
	// if this should return the updated book -> add {new: true} 
	Celebrity.findByIdAndUpdate(id, {
		name, occupation, catchPhrase
	}, { new: true })
		.then(updatedCelebrity => {
			console.log(updatedCelebrity)
			// redirect to the detail page of the updated book	
			res.redirect(`/celebrities/${updatedCelebrity._id}`)
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


router.get('/song/delete/:id', (req, res, next) => {
	const id = req.params.id
	Song.findByIdAndDelete(id)
		.then(() => {
			// redirect to the books list
			res.redirect('/celebrities')
		})
		.catch(err => {
			next(err)
		})
});

  module.exports = router;