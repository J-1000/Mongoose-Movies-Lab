let express = require("express"); 
const Celebrity = require("../models/Celebrity");
let router = express.Router(); 
const Movie = require("../models/Movie"); 

// GET "movies"
router.get("/movies", (req, res, next) => { 
    // get all movies from database
    Movie.find()
    .populate("cast")
    .then(MoviesFromDB => {
        console.log(MoviesFromDB)
        // render view "movie inventory" with all movies from database 
        res.render("movies/show", {movies: MoviesFromDB})
    })
    .catch((err) => {
        next(err);
    })
})

// GET "/movies/new" 
router.get("/movies/new", (req, res, next) => {
    Celebrity.find()
    .then(CelebritiesFromDB => {
        console.log(CelebritiesFromDB)
        // render view "celebrity inventory" with all movies from database 
        res.render("movies/new", {celebrities: CelebritiesFromDB})
    })
    .catch((err) => {
        next(err);
    })
}); 

// GET "/movies/:id"
router.get("/movies/:id", (req, res, next) => {
    console.log("Movies", req.params._id); 
    const _id = req.params.id 
    Movie.findById(_id)
        .then(movie => {
            console.log(movie) 
            res.render("movies/show", {movie: movie})
        }).catch(err => {
            next(err)
        })
});

// POST "movies" 
router.post("/movies", (req, res, next) => {
    console.log("movies"); 
    // get values from input fields 
    const {title, genre, plot, cast } = req.body 
    console.log(title, genre, plot, cast)
    // create movie document in the database 
    Movie.create({
        title: title, 
        genre: genre, 
        plot: plot, 
        cast: cast, 
    }).then(createdMovie => {
        console.log(createdMovie)
        // show detail view with created movie 
        // redirect to detail view of this movie - gets current instance of movie 
        // res.redirect("/movies/${createdMovie._id}")
        res.redirect("/movies")
    }).catch(err => {
        next(err)
    })
});

// GET "/movies" 
router.post("/movies/:id/delete", (req, res, next) => {
    console.log("DELETE") 
    const _id = req.params.id 
    // delete this movie in database 
    Movie.findByIdAndDelete(_id)
    .then(theMovie => {
        console.log(theMovie)
        res.redirect("/movies")
    })
    .catch(err => {
        next(err)
    })
}); 


router.get("/movies/:id/edit", (req, res, next) => {
    console.log("EDIT") 
    const _id = req.params.id 
    // get this movie from the database 
    Movie.findById(_id)
    .then(movie => {
        console.log(movie)
        res.render("movies/edit", {movies: movie})
    })
    .catch(err => {
        next(err)
    })
})

router.post("/movies/:id/edit", (req, res, next) => {
    console.log("EDIT") 
    const _id = req.params.id 
    const {title, genre, plot, cast} = req.body 
    console.log(title, genre, plot, cast)
    Movie.findByIdAndUpdate(_id, {title, genre, plot, cast})
    .then(() => {
        res.redirect("/movies")
    })
    .catch(err => {
        next(er)
    })
})

module.exports = router; 