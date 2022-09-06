const router = require("express").Router();
const Celebrity = require("../models/Celebrity.js");
const Movie = require('../models/Movie.js')

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
    Movie.find()
        .populate('cast')
        .then(moviesFromDB => {
           // console.log(moviesFromDB)
            res.render('movies', { movies: moviesFromDB })
        })         
});

router.post('/movies', (req,res,next) => {
    const {title, genre, plot, cast} = req.body
    Movie.create({title, genre, plot, cast})
             .then(createdMovie => {
              //  console.log(createdMovie)
                res.redirect('/movies')
             })
             .catch(err => next(err))
})

router.get('/movies/:id', (req,res,next) =>{
    Movie.findById(req.params.id)
            .populate('cast')
            .then(movieByID => {
                //console.log(movieByID)
                res.render('movies/show', { movie: movieByID })
            })
            .catch(err => next(err))
});


router.get('/movies/:id/edit', (req,res,next) => {
    
   let options = '' 

    Movie.findById(req.params.id)         
            .populate('cast')          
            
            .then(movieFromDB => {
                Celebrity.find() 
                    .then (celebrietiesFromDB => {
                        const movieCastName = movieFromDB.cast.map((obj)=> obj.name)
                        console.log(movieCastName)
                        
                        celebrietiesFromDB.forEach(celeb => {
                            
                            if (movieCastName.includes(celeb.name)) {
                                //console.log(celeb._id)
                                options += `<option value="${celeb._id}" selected>${celeb.name}</option>`
                            } else {
                                options += `<option value="${celeb._id}">${celeb.name}</option>`
                            }
                            
                        })
                        res.render('movies/edit', {movie : movieFromDB, cast : options} )
                    })                  
                
            })
            .catch(err => next(err))
})

 router.post('/movies/:id/edit', (req,res,next) => {
    const {title, genre, plot, cast} = req.body
 	Movie.findByIdAndUpdate(req.params.id, {
		title,
        genre,
        plot,
        cast
	})
	.then(() => {
        
		res.redirect(`/movies/${req.params.id}`)
	})
	.catch(err => next(err))
})

router.post('/movies/:id/delete', (req,res,next) => {
    Movie.findByIdAndDelete(req.params.id)
            .then(()=> {
                res.redirect('/movies')
            })
            .catch(err => next(err))
})




module.exports = router;