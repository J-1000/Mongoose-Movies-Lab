let express = require("express"); 
let router = express.Router(); 
const Celebrity = require("../models/Celebrity"); 

// GET "celebrities"
router.get("/celebrities", (req, res, next) => {
    console.log("CELEBS")
    // get all celebs from database
    Celebrity.find()
    .then(celebritiesFromDB => {
        console.log(celebritiesFromDB)
        // render view "celeb inventory" with all celebs from database 
        res.render("celebrities/index", {celebrities: celebritiesFromDB})
    })
    .catch((err) => {
        next(err);
    })
})

// GET "/celebrities/new" 
router.get("/celebrities/new/", (req, res, next) => {
    res.render("celebrities/new")
}); 

// GET "/celebrities/:id"
router.get("/celebrities/:id", (req, res, next) => {
    console.log("Celebs", req.params._id); 
    const _id = req.params._id 
    Celebrity.findById(_id)
        .then(celebrity => {
            console.log(celebrity) 
            res.render("celebrities/show", {celebrity: celebrity})
        }).catch(err => {
            next(err)
        })
});

// POST "celebrities" 
router.post("/celebrities/", (req, res, next) => {
    console.log("CELEBS"); 
    // get values from input fields 
    const {name, occupation, catchPhrase } = req.body 
    console.log(name, occupation, catchPhrase)
    // create celebrity document in the database 
    Celebrity.create({
        name: name, 
        occupation: occupation, 
        catchPhrase: catchPhrase 
    }).then(createdCeleb => {
        console.log(createdCeleb)
        // show detail view with created celeb 
        // redirect to detail view of this celeb - gets current instance of celebrity 
        // res.redirect("/celebrities/${createdCeleb._id}")
        res.redirect("/celebrities")

    }).catch(err => {
        next(err)
    })
});

// GET "/celebrities" 
router.post("/celebrities/:id/delete", (req, res, next) => {
    console.log("DELETE") 
    const _id = req.params.id 
    // delete this celebrity in database 
    Celebrity.findByIdAndDelete(_id)
    .then(theCelebrity => {
        console.log(theCelebrity)
        res.redirect("/celebrities")
    })
    .catch(err => {
        next(err)
    })
}); 

router.get("/celebrities/:id/edit", (req, res, next) => {
    console.log("EDIT") 
    const _id = req.params.id 
    // get this celebrity from the database 
    Celebrity.findById(_id)
    .then(celebrity => {
        console.log(celebrity)
        res.render("celebrities/edit", {celebrity: celebrity})
    })
    .catch(err => {
        next(err)
    })
})

router.post("/celebrities/:id/edit", (req, res, next) => {
    console.log("EDIT") 
    const _id = req.params.id 
    const {name, occupation, catchPhrase} = req.body 
    console.log(name, occupation, catchPhrase)
    Celebrity.findByIdAndUpdate(_id, {name, occupation, catchPhrase})
    .then(() => {
        res.redirect("/celebrities")
    })
    .catch(err => {
        next(er)
    })
})

module.exports = router; 
