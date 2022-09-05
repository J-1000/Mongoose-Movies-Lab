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