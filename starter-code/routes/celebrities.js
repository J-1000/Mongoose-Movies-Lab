const express= require('express');
const router = express.Router();
const Celebrity=require('../models/Celebrity');
const Movie= require('../models/Movie');


router.get('/celebrities', (req,res,next) =>{
    Celebrity.find().then((celebrities) =>{
        //res.send(celebrities);
        res.render('celebrities/index', {celebrities});
        //console.log(celebrityList);
    }).catch((err) => {
        console.log(err);
        next();

    });
});

//iteration 3

router.get('/celebrities/:id', (req, res, next) =>{
    Celebrity.findById(req.params.id).then((celebrities) =>{
       // res.send(celebrities);
       res.render('celebrities/show', {celebrities});
    }).catch((err) =>{
        console.log(err);
        next();
    });
});


router.get('/celebrities/new', (req, res, next) =>{
res.render('celebrities/new');
});

router.post('/celebrities', (req,res, next) =>{
let {name, occupation, catchPhrase}=req.body;
Celebrity.create({
    name:name,
    occupation:occupation,
    catchPhrase:catchPhrase,
})
.then( res.redirect('/celebrities'))
.catch(() => {
    res.render('/celebrities/new');
});
});

router.post('/celebrities/:id/delete', (req, res, next) =>{
    Celebrity.findByIdAndDelete(req.params.id)
    .then(res.redirect('/celebrities'))
    .catch((err) => {
        console.log(err); 
        next();
    });
});

router.get('/celebrities/:id/edit', (req, res, next) =>{
    Celebrity.findById(req.params.id)
    .then((celebrity) =>{
        //res.send({celebrity})
       res.render('celebrities/edit', {celebrity});
    })
    .catch((err) => {
        console.log(err);
    next();
 });
});

router.post('/celebrities/:id/edit', (req,res, next) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(req.params.id,{
        name:name,
        occupation:occupation,
        catchPhrase:catchPhrase,
    }).then(
        res.redirect('/')
    ).catch(err=>{
        next(err);
    })

});

router.get('/movies/new', (req, res) =>{
    Celebrity.find()
    .then((celebrities)=>{
        
res.render('movies/new', {celebrities})
    })
    .catch(err => {
        next(err);
    });
})

router.post('/movies/new', (req,res) =>{
    let {title, genre, plot, cast}=req.body;
    Movie.create({
       title:title,
       genre:genre,
       plot:plot,
       cast:cast,
    })
    .then(
    res.redirect('/movies/new'))
    .catch(() => {
        res.render('/movies/new');
    });
    });

    router.get('/movies', (req,res, next) =>{
        Movie.find()
        .populate("cast")
        .then((movies) =>{
            
            //res.send({movies})
          res.render('movies/index', {movies});
          
        })
        .catch(err => {
            next(err)
        });
    });

    router.get('/movies/:id/edit', (req, res, next) =>{
        Movie.findById(req.params.id)
        .then((movie) =>{
            //res.send({celebrity})
           res.render('movies/edit', {movie});
        })
        .catch((err) => {
            console.log(err);
        next();
     });
    });
    
    router.post('/movies/:id/edit', (req,res, next) => {
        const {title, genre, plot, cast} = req.body;
        Movie.findByIdAndUpdate(req.params.id,{
          title:title,
          genre:genre,
          plot:plot,
          cast:cast,
        }).then(
            res.redirect('/')
        ).catch(err=>{
            next(err);
        })
    
    });

module.exports=router;