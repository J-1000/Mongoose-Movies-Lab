const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

router.get('/movies',(req,res)=>{
    Movie.find().populate('cast').then(movie=>res.render('../views/movies/index',{movie:movie}))
    })
 
router.get('/movies/new',(req,res)=>{
    console.log('jamil')
    Celebrity.find().then(celebs=>{res.render('../views/movies/new',{celebs})})

})
router.post('/movies', (req, res) => {
    console.log(req.body);
    const {
        title,
        genre,
        plot,
        cast
    } = req.body;

    Movie.create({
        title,
        genre,
        plot,
        cast
    }).then( movie => {
        console.log(`Success! ${title} was added to the database.`);
        res.redirect(`/movies`);
    }).catch(err => {
        console.log(err);
    })
})
module.exports=router