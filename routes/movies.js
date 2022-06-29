const router = require("express").Router();
//We need to redefine Celebrity in order to use it for the route
const Celebrity = require('../models/celebrity')
const Movie = require('../models/movie')

//get rout for movies
/* GET celbrities*/
router.get('/movies', (req, res, next) => {
    Movie.find()
        .populate('cast')
        .then(moviesFromDB => {
            // render a view named 'movies' with all the movies from the db 
            res.render('movies', { movieList: moviesFromDB })
        })
        .catch(err => {
            console.log('Error movies are not listed')
        })
        .then(moviesFromDB => {

            res.render('movies', { movieList: moviesFromDB })
        })
        .catch(err => {
            console.log('Error movies are not listed')
        })
})

//make a new movie 
router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render('movies/new', { celebritiesList: celebritiesFromDB })
        })
        .catch(err => {
            console.log('Error celebrities are not listed')
        })
})

//make new movie post route
router.post('/movies', (req, res, next) => {
    const { title, gengre, plot, cast } = req.body
    Movie.create({
        title: title,
        gengre: gengre,
        plot: plot,
        cast: cast
    })
        .then(createdMovie => {
            console.log(createdMovie)

            res.redirect(`/movies`)
        })
        .catch(err => {
            console.log('Error Celeb was not newly added')
        })
});

//edit movie get groute
router.get('/movies/edit/:id', (req, res, next) => {
    const movieId = req.params.id
    Movie.findById(movieId)
        .populate('cast')

        .then(moviesFromDB => {
            console.log(moviesFromDB)
            res.render('movies/edit', { details: moviesFromDB })
        })

        .catch(err => {
            consolog('connection error')
            next(er)
        })

})

//edit celebrity
router.post('/movies/edit/:id', (req, res, next) => {
    const moviebId = req.params.id
    const { title, gengre, plot, cast } = req.body
    // this is using the object shorthand in the 2nd parameter
    Movie.findByIdAndUpdate(moviebId, { title, gengre, plot, cast })
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => {
            next(err)
        })
});


module.exports = router;