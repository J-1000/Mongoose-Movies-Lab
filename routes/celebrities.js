// Article about New Router in ExpressJS 4.0 -  https://www.digitalocean.com/community/tutorials/learn-to-use-the-new-router-in-expressjs-4
const express = require('express');
// const { route } = require('.');
// const { db } = require('../models/celebrity');
const router = express.Router();
const Celebrity = require('../models/celebrity');

// Locate the /celebrities GET route in routes/celebrities.js
router.get('/celebrities', (req, res, next) => {
    // https://www.geeksforgeeks.org/mongoose-find-function/
    // model.find() has only Two parameters [condition, query projection]
    Celebrity.find({})
        .then(celebritiesfromDB => {
            console.log(celebritiesfromDB)
                //render a view
            res.render('celebrities/index.hbs', { displayCelebrities: celebritiesfromDB, doctitle: 'Celebrities' });
        })
        .catch(err => next(err));
});

// Iteration #4: Adding New Celebrities
router.get('/celebrities/new', (req, res) => {
    res.render('celebrities/new.hbs')
})

router.post('/celebrities/new', (req, res) => {
    // get the values from request body. Create an object with keys for name, occupation, and catchPhrase.
    const { name, occupation, catchPhrase } = req.body;
    // const name = req.body.name;
    // const occupation = req.body.occupation;
    // const catchPhrase = req.body.catchPhrase;
    // create a new celebrity in the db/an instance of the Celebrity model with the object.
    Celebrity.create({ name, occupation, catchPhrase })
        .then(createdCelebrity => {
            console.log(createdCelebrity)
            res.redirect('/celebrities')
        })
        .catch(err => res.render('celebrities/new'))
})

// Iteration #5: Deleting Celebrities
router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findByIdAndRemove(id)
        .then(removedCelebrities => {
            res.redirect('/celebrities')
        })
        .catch(err => next(err));
})

// Iteration #3: The Celebrity Details Page - Create the /celebrities/:id GET route in routes/celebrities.js.
// findOne(object) or findById(id) method to retrieve the details of a specific celebrity by its id.
router.get('/celebrities/:id', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then(celebritiesfromDB => {
            console.log(celebritiesfromDB)
            res.render('celebrities/show.hbs', { celebritiesDetails: celebritiesfromDB })
        })
        .catch(err => next(err));
})

// Iteration #6 (Bonus): Editing Celebrities
router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id;
    Celebrity.findById(id)
        .then(editedCelebrities => {
            console.log(editedCelebrities)
            res.render('celebrities/edit.hbs', { editedCelebrities, doctitle: 'Edit the Celebrity Information' })
        })
        .catch(err => next(err));
})

router.post('/celebrities/:id', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
        .then(editedCelebrities => {
            res.redirect(`/celebrities/${editedCelebrities._id}`)
        })
        .catch(err => next(err));

})


module.exports = router;