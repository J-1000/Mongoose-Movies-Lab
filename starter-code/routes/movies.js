const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

router.get('/movies',(req,res)=>{
    Movie.find().then(movie=>res.render('../views/movies/index',{movie:movie}))
    })
 
router.get('/movies/new',(req,res)=>{
    console.log('jamil')
    res.render('../views/movies/new')
})
router.post('/movies', (req, res) => {
    console.log(req.body);
    const {
        title,
        genre,
        plot
    } = req.body;

    Movie.create({
        title,
        genre,
        plot
    }).then( movie => {
        console.log(`Success! ${title} was added to the database.`);
        res.redirect(`/movies`);
    }).catch(err => {
        console.log(err);
    })
})
module.exports=router