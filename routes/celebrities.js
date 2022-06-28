const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


const celebs = require('../models/Celebrity')

//celebritiesFromDB 
router.get("/celebrities", (req,res,next)=>{
  celebs.find()
  .then((celebsFromDB) => {
    res.render('celebrities/index', { celebrityList: celebsFromDB })
  })
  .catch((err) => {
    next(error)
  });
})
router.get("/celebrities/new", (req, res, next) => {
  res.render("celebrities/new");
});

router.get('/celebrities/:id', (req,res,next)=>{
  const celebrityId = req.params.id;
  celebs.findById(celebrityId)
    .then((celebrityFromDB) => {
      res.render("celebrities/show", { celebrity: celebrityFromDB });
    })
    .catch((err) => {
      next(err);
    });
});


router.post("/celebrities", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  celebs.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then((createdcelebs) => {
      res.redirect(`/celebrities/${createdcelebs._id}`);
    })
    .catch((err) => {
      console.log('here')
      next(err);
    });
});


    router.post("/celebrities/:id/delete", (req,res,next)=>{
        celebs.findByIdAndRemove()
        .then((celebsId)=>{
          res.redirect("/celebrities")
        })
        .catch((err)=>{
          next(err)
          return err
        })
    })