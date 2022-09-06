const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')
const router = require('express').Router();

router.get("/movies/new", (req,res,next) => {
    async function newMovie() {
        try{ 
            const celebList = await Celebrity.find();
            res.render('movies/new.hbs', {celebList})
        }
        catch(err) {
            next(err)
        }
    }
    newMovie();
})

router.get("/movies", (req,res,next) => {
    async function showMovies() {
        try{
            const moviesArr = await Movie.find().populate('cast');
            res.render('movies/index.hbs', {moviesArr})
        }
        catch(err) {
            next(err)
        }
    }
    showMovies();
})

router.post("/movies", (req,res,next) => {
    async function newMovie() {
        try{
            // unpack the request from form to object :)
            const {title,genre,plot,cast} = req.body;
            Movie.create({
                title,
                genre,
                plot,
                cast,
            })
            res.redirect("/movies")
        }
        catch(err) {
            next(err)
        }
    }
    newMovie();
})

router.get("/movies/:id/edit", (req,res,next) => {
    const movieId = req.params.id;
    async function editMovie() {
        try{
            const selectedMovie = await Movie.findById(movieId).populate('cast')
            const selectedMovieCast = selectedMovie.cast;
            const selectedMovieCastIds = selectedMovieCast.map(each => each._id)
            const allCelebritiesNotInMovie = await Celebrity.find({_id: {$nin: selectedMovieCastIds}});
            res.render('movies/edit', {selectedMovie, selectedMovieCast, allCelebritiesNotInMovie})
        }
        catch(err) {
            next(err)
        }
    }
    editMovie();
})

router.post("/movies/:id/edit", (req,res,next) => {
    const movieId = req.params.id;
    const {title,genre,plot,cast} = req.body;
    async function editMovie() {
        try{
            const selectedMovie = await Movie.findByIdAndUpdate(movieId,{
            title:title,
            genre:genre,
            plot:plot,
            cast:cast
            })
            res.redirect("/movies")
        }
        catch(err) {
            next(err)
        }
    }
    editMovie();
})

module.exports = router