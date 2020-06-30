const express = require('express');
const Celebrity = require('../models/Celebrity');
const router = express.Router();

router.get('/', (req, res) => {
    Celebrity.find().then(celeb => {
        res.render('celebrities/index', { celeb: celeb });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/:id', (req, res, next) => {
    const celebId = req.params.id;
    Celebrity.findById(celebId).then(celeb => {
        res.render('celebrities/show', { celeb: celeb });
    }).catch(err => {
        console.log(err);
        next(err);
    });
});

module.exports = router;
