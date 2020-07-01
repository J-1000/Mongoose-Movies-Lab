
const express = require('express');
const Celebs = require('../models/celebrity');
const router  = express.Router();
const newCeleb = require('../models/celebrity');

//------------------------------------------------------get to new celeb form
router.get("/celebrities/new", (req, res) => {
      res.render("celebrities/new");
});


// ------------------------------------------------------add a celebrity to the list
  router.post("/celebrities/new", (req, res) => {
    console.log("N?E?W?????", req.body);
    const { name, occupation, catchPhrase } = req.body;
    newCeleb.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    }).then((celebmodel) => {
        console.log(`Success! ${name} was added to the database.`);
        res.redirect("/celebrities");
        }).catch((err) => {
        console.log(err);
      })
  })
  
  //------------------------------------------------------delete
  router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebs.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch(err => {
        console.log(err);
      })
  });

  
  //------------------------------------------------------edit
  router.get('/celebrities/:_id/edit'), (req, res, next) => {
    Celebs.findOne(req.params._id)
    .then(celebmodel => {
      res.render('/celebrities/edit',{Celebs: celebmodel});
    })
    .catch(err => {
      console.log(err);
    })
  };

  //-----------------------------------------------------post edit 
  router.post('/celebrities/:_id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    const celebId = req.params._id;
    Celebs.findByIdAndUpdate(celebId, {
     name,occupation,catchPhrase
    })
      .then(celebmodel => {
        res.redirect(`/celebrities/${celebId}`);
      })
      .catch(err => {
        console.log(err);
      });
  })

// ------------------------------------------------------individual celebrity details
router.get("/celebrities/:id", (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  Celebs.findById(req.params.id)
    .then((celebmodel) => {
      console.log(celebmodel);
      res.render("celebrities/show", { celebmodel });
    })
    .catch((err) => {
      console.log(err);
    })
});
  module.exports = router;

