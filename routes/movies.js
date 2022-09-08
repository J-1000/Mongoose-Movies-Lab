const router = require("express").Router();
const Celebrity = require('../models/celebrity.js')
const movie=require('../models/movie.js')



router.get('/movies/new', (req,res,next) => {
    Celebrity.find()
        .then (celebritiesFromDB => {
            //console.log(celebritiesFromDB)
            res.render('movies/new', {cast: celebritiesFromDB})
        })
       // 
       .catch(err => next(err))   
});

router.get('/movies', (req,res,next) => {
    movie.find()
        .populate('cast')
        .then(moviesFromDB => {
           // console.log(moviesFromDB)
            res.render('movies', { movies: moviesFromDB })
        })         
});





router.post('/movies', (req, res, next) => {
	// console.log(req.body)
	const { title,genre ,plot,cast } = req.body
	movie.create({title,plot ,plot,cast })
		.then(createdmovie => {
			console.log(createdmovie)
			// redirect to '/celebrities/<id of the book>
			res.redirect('/movies/')
			
		})
		.catch(err => next(err))

});


module.exports = router;