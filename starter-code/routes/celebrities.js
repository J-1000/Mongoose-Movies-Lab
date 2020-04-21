const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET celebrities list */
  router.get('/celebrities', (req, res, next) => {
    Celebrity.find().then(celebs => {
        res.render('celebrities', { celebrities: celebs });
      })    
  });
  router.get("/celebrities/add", (req,res) => {
   res.render('celebrities/celebrityForm')
    })
  router.post('/celebrities', (req, res) => {
  // const title = req.body.title;
  // const author = req.body.author;
  // const description = req.body.description;
  // const rating = req.body.rating;
  // use object destructuring
  const { name, occupation, catchPhrase} = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  }).then(celeb => {
    console.log(`Success ${celeb} was added to the database`);
    res.redirect(`/celebrities`);
  }).catch(err => {
    console.log(err);
    // logs the error to the console
    next(err);
  });
});
  router.get("/celebrities/:id", (req,res) => {
  Celebrity.findById(req.params.id)
    .then(celeb => {
      res.render('celebrities/celebritie', { celeb: celeb });
    });
  })
  router.post("/celebrities/:id/delete", (req,res) => {
    Celebrity.findByIdAndRemove(req.params.id)
      .then(
        res.redirect("/celebrities")
      )
      .catch(err => {
        next(err);
      });
    })
    router.get('/celebrities/edit/:celebId', (req, res) => {
        Celebrity.findById(req.params.celebId)
          .then(celeb =>{
            res.render('celebrities/edit', { celeb: celeb });
          });
      });
      router.post('/celebrities/:celebId', (req, res) => {
        const { name, occupation, catchPhrase} = req.body;
      Celebrity.findByIdAndUpdate(req.params.celebId, {
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
        }).then(celeb => {
            res.redirect(`/celebrities/${celeb._id}`);
        }).catch(err => {
            next(err);
        })
        });
        
module.exports = router;
