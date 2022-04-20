const router = require('express').Router();
const Movie = require('../models/Movie');
const Celebrity = require('../models/Celebrity');

router.get('/movies/new', (req, res, next) => {
    const celebrities = Celebrity.find()
    .then(celebrities => {
        res.render('movies/new', {celebrities: celebrities});
    })
})

router.get('/movies', (req, res, next) => {
    const movies = Movie.find()
    .populate('cast')
    .then(movies => {
        res.render('movies/show', {movies: movies});
    })
})

router.post('/movies', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    })
    .then(createdMovie => {
        res.redirect('movies');
    })
    .catch(err => {
        res.render('movies/new');
    })
})

router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        Celebrity.find()
        .then(celebrities => {
            res.render('movies/edit', {movieAndCast: createMovieAndCast(movie, celebrities)})
        })
    })
    .catch(err => {
        next(err)
    })
})

router.post('/movies/:id', (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    const movie = {
        title: title,
        genre: genre,
        plot: plot,
        cast: cast
    }

    Movie.findByIdAndUpdate(req.params.id, movie)
    .then(createdMovie => {
        res.redirect('/movies');
    })
    .catch(err => {
        res.render('movies/new');
    })
})

function createMovieAndCast(movie, celebrities) {
    const cast = celebrities.filter(function (celebrity) {
        let isInMoviesCast = false;
        movie.cast.forEach(function(movieCelebrity) {
            if (movieCelebrity.name === celebrity.name) {
                isInMoviesCast = true;
            }
        })

        return !isInMoviesCast;
    })
    
    return {
        movie: movie,
        cast: cast
    };
}

module.exports = router;
