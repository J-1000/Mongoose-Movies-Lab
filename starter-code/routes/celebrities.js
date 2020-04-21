const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');


//Iteration 2: Listing Our Celebrities
router.get('/index', (req, res, next) => {

    Celebrity.find().then(celebrities => {
        res.render('celebrities/index', {celebritiyList: celebrities});
    }).catch(err => {
        console.log(err);
        next(err);
      });

  });

//Iteration #4: Adding New Celebrities
router.get('/new', (req, res, next) =>{
    res.render('celebrities/new');
});


router.post('/new', (req, res) => {
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase
    }).then(celebrity => {
        console.log(`Succesfully added ${celebrity} to database`)
        res.redirect(`/celebrities/${celebrity._id}`);
    }).catch(err => {
        console.log(err);
        next(err);
      });

})


//Iteration #5: Deleting Celebrities
router.post('/:id/delete', (req, res) => {

    Celebrity.findByIdAndRemove({_id:req.params.id
       
    }).then(celebrity => {
        console.log(`Succesfully removed ${celebrity} from database`)
        res.redirect(`/celebrities/index`);
    }).catch(err => {
        console.log(err);
        next(err);
      });

})



//Iteration #3: The Celebrity Details Page
router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => {
            res.render('celebrities/show', {showCelebrity: celebrity});
        }).catch(err => {
            console.log(err);
            next(err);
          });
})



module.exports = router;