const router = require("express").Router();
//We need to redefine Celebrity in order to use it for the route
const Celebrity = require('../models/celebrity')

/* GET celbrities*/
router.get('/celebrities', (req, res, next) => {
    // console.log('celebrities')
    // get all the celebrities from the db
    Celebrity.find()
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            // render a view named 'celebrities' with all the celebrities from the db 
            res.render('celebrities', { celebritiesList: celebritiesFromDB })
        })
        .catch(err => {
            console.log('Error ${celebritiesFromDB._i} are not listed')
        })
})

//route to new celebrities has be checked befor checking for id
router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
});




//delete celebrity 
router.post('/celebrities/:id/delete', (req, res, next) => {
    const celebId = req.params.id
    Celebrity.findByIdAndDelete(celebId)
        .then(() => {
            console.log('A celebrity was deleted')
            // render a view named 'celebrities' with all the celebrities from the db 
            res.redirect(`celebrities`)
        })
        .catch(err => {
            console.log('Error failed to delete celebrity')
        })
})

//edit celebrity get rout
router.get('/celebrities/edit/:id', (req, res, next) => {
    const celebId = req.params.id
    Celebrity.findById(celebId)
        .then(celebritiesFromDB => {
            res.render('celebrities/edit', { details: celebritiesFromDB })
        })
        .catch(err => {
            next(er)
        })

})


//edit celebrity
router.post('/celebrities/edit/:id', (req, res, next) => {
    const celebritybId = req.params.id
    const { name, occupation, catchPhrase } = req.body
    // this is using the object shorthand in the 2nd parameter
    Celebrity.findByIdAndUpdate(celebritybId, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect(`/celebrities`)
        })
        .catch(err => {
            next(err)
        })
});


//get celebrities id for detail page
router.get('/celebrities/:id', (req, res, next) => {
    console.log(req.params)
    console.log(req.params.id)
    const celebrityId = req.params.id
    Celebrity.findById(celebrityId)
        .then(celebritiesFromDB => {
            console.log(celebritiesFromDB)
            res.render('celebrities/show', { details: celebritiesFromDB })
        })
        .catch(err => {
            next(err)
        })
});



//Make new celebreties
router.post('/celebrities', (req, res, next) => {
    // retrieve the values from the input fields
    // using object destructuring
    const { name, occupation, catchPhrase } = req.body
    // create the book document in the db
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
    })
        .then(createdCelebrity => {
            console.log(createdCelebrity)
            // show the detail view with the created book

            // current instance of the book
            res.redirect(`/celebrities/${createdCelebrity._id}`)
        })
        .catch(err => {
            console.log('Error Celeb was not newly added')
        })
});


module.exports = router;