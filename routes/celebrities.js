const router = require('express').Router();
const Celebrity = require('../models/Celebrity')

// Get the celebrities page :)

router.get("/celebrities", (req,res,next) => {
    async function celebrityFinder() {
        try{
            const celebrityArr = await Celebrity.find()
            res.render('celebrities/index', {celebrityArr})
        }
        catch(err) {
            next(err)
        }
    } 
    celebrityFinder();
})

router.get("/celebrities/new", (req,res,next) => {
    async function celebrityCreator() {
        try{
            res.render('../views/celebrities/new', {})
        }
        catch(err) {
            next(err)
        }
    }
    celebrityCreator();
})

router.post("/celebrities", (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body
    // directly unpack the req.body to 3 variables which have same name as keys of body :)
    async function celebrityCreator() {
        try{
            const newCeleb = await Celebrity.create({name,occupation,catchPhrase})
            res.redirect('/celebrities')
        }
        catch(err) {
            console.log(err)
            res.redirect('/celebrities/new')
        }
    }
    celebrityCreator();
})

router.post("/celebrities/:id/delete", (req,res,next) => {
    // pull id from request parameters
    const celebId = req.params.id;
    async function celebrityDeleter() {
        try{
            const deletedCeleb = await Celebrity.findByIdAndDelete(celebId);
            res.redirect('/celebrities')
        }
        catch(err) {
            next(err)
        }
    }
    celebrityDeleter();
})

router.get("/celebrities/:id/edit", (req,res,next) => {
    const celebId = req.params.id;
    async function celebrityEditor() {
        try {
            const selectedCeleb = await Celebrity.findById(celebId)
            res.render('../views/celebrities/edit', {celebrity:selectedCeleb})
        }
        catch(err) {
            next(err)
        }
    }
    celebrityEditor();
})

router.post("/celebrities/:id", (req,res,next) => {
    const celebId = req.params.id;
    const {name,occupation,catchPhrase} = req.body;
    async function celebrityUpdater() {
        try{
            const selectedCeleb = await Celebrity.findByIdAndUpdate(celebId, {name: name, occupation: occupation, catchPhrase: catchPhrase})
            res.redirect('/celebrities')
        }
        catch(err) {
            next(err)
        }
    }
    celebrityUpdater();
})



// THIS ONE SHOULD BE LAST BECAUSE ANY OTHER /CELEBRITIES/SOMEADDRESS WILL GET REDIRECTED BY THIS ROUTER
// AND FUCK EVERYTHING UP
router.get("/celebrities/:id", (req,res,next) => {
    const id = req.params.id;
    async function detailsFinder() {
        try {
            const oneCelebrity = await Celebrity.findById(id)
            console.log(oneCelebrity)
            res.render('../views/celebrities/show', { celebrity:oneCelebrity })
        }
        catch(err) {
            next(err)
        }
    }
    detailsFinder();
})

module.exports = router;