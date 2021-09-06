const router = require("express").Router();
const { render } = require("../app");
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get("/celebrities/index", (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("celebrities/index", { celebritiesList: celebritiesFromDB });
        }).catch(err => { 
            next(err);
        })
});

router.post('/celebrities/index', (req, res, next) => {
	console.log(req.body);
	const { name, occupation, catchPhrase } = req.body;
	Celebrity.create({
		name: name,
		occupation: occupation,
		catchPhrase: catchPhrase,
	})
		.then(createdCelebrity => {
            console.log(createdCelebrity);
			res.redirect('/celebrities/index');
		})
		.catch(err => next(err));
});

router.get("/celebrities/new", (req, res, next) => {
    res.render('celebrities/new');
});

router.post("/celebrities/:id/delete", (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity.findByIdAndDelete(celebrityId)
        .then(() => {
            res.redirect("/celebrities/index");
        }).catch(err => { 
            next(err);
        })
});

router.get("/celebrities/:id/edit", (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity.findById(celebrityId)
        .then(celebrityFromDB => {
            res.render("celebrities/edit", { celebrity: celebrityFromDB });
        }).catch(err => { 
            next(err);
        })
});


router.get("/celebrities/:id", (req, res, next) => {
    const celebrityId = req.params.id;
    Celebrity.findById(celebrityId)
        .then(celebrityFromDB => {
            res.render("celebrities/show", { celebrity: celebrityFromDB });
        }).catch(err => { 
            next(err);
        })
});

router.post("/celebrities/:id", (req, res, next) => {
    const celebrityId = req.params.id;
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.findByIdAndUpdate(celebrityId, {
        name:name,
        occupation:occupation,
        catchPhrase:catchPhrase
    }, {new:true})
        .then(() => {
            res.redirect(`/celebrities/${celebrityId}`);
        }).catch(err => { 
            next(err);
        })
});

module.exports = router;
