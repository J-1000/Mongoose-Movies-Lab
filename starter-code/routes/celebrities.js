const router = require("express").Router();

const Celebrity = require('../models/Celebrity')

router.get('/celebrities', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    res.render('celebrities/index', { celebrities })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/celebrities/new', async (req, res, next) => {
  try {
    res.render('celebrities/new')
  } catch (error) {
    next(new Error(error.message))
  }
})

router.post('/celebrities', async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body
    const celebrity = await Celebrity.create({
      name,
      occupation, 
      catchPhrase
    })
    res.redirect(`celebrities/${celebrity._id}`)
  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/celebrities/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const celebrity = await Celebrity.findById(id)
    res.render('celebrities/show', { celebrity })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.post('/celebrities/:id/delete', async (req, res, next) => {
  try {
    const id = req.params.id
    await Celebrity.findByIdAndRemove(id)
    res.redirect('/celebrities')

  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/celebrities/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id
    const celebrity = await Celebrity.findById(id)
    res.render('celebrities/edit', { celebrity })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.post('/celebrities/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { name, occupation, catchPhrase } = req.body
    await Celebrity.findByIdAndUpdate(id, {
      name,
      occupation, 
      catchPhrase
    }, { new: true })
    res.redirect(`/celebrities/${id}`)
  } catch (error) {
    next(new Error(error.message))
  }
})

module.exports = router;