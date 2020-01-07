const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');



router.get('/new', (req, res, next) => {
    res.render("../views/celebrities/new.hbs");
  });
  

  router.get('/:celebId', (req, res, next) => {
    Celebrity.findById(req.params.celebId)
      .then(element=> {
        res.render('../views/celebrities/show.hbs', { celebrity: element });
      })
      .catch(error => {
        console.log('Error while retrieving details: ', error);
      })
  });
  

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then(allCelebsFromDB => {
      res.render('../views/celebrities/index.hbs', { celebrities: allCelebsFromDB });
    })
    .catch(error => {
      console.log('Error while getting the records from the DB: ', error);
    })
});


  /*router.post('/books/add', (req, res, next) => {
    //  console.log(req.body);
    //  const { title, author, description, rating } = req.body;
    //  const bookObject = { title, author, description, rating};
    //  console.log(bookObject);
    const newBook = new Book(req.body);
    newBook.save()
      .then((book) => {
        res.redirect('/books');
      })
      .catch((error) => {
        console.log(error);
      })
  }); */



module.exports = router;