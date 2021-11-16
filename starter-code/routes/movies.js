const router = require('express').Router();

const Celebrity = require('../models/Celebrity');
const Movie = require('../models/Movie');

router.get('/movies', async (req, res, next) => {
  try {
    const movies = await Movie.find()
    res.render('movies/index', { movies })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/movies/new', async (req, res, next) => {
  try {
    // get all the celebrities
    const celebrities = await Celebrity.find()
    res.render('movies/new', { celebrities })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.post('/movies', async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body
    const movie = await Movie.create({
      title,
      genre,
      plot,
      cast
    })
    res.redirect(`movies/${movie._id}`)
  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/movies/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const movie = await Movie.findById(id).populate('cast')
    res.render('movies/show', { movie })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.post('/movies/:id/delete', async (req, res, next) => {
  try {
    const id = req.params.id
    await Movie.findByIdAndRemove(id)
    res.redirect('/movies')

  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/movies/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id
    const movie = await Movie.findById(id)
    const celebrities = await Celebrity.find()
    let selected = []
    let option = ''
    celebrities.forEach(c => {
      selected = movie.cast.map(cb => cb._id.toString().includes(c._id.toString()) ? 'selected' : '')
      option += `<option value="${c._id}" ${selected}>${c.name}</option>`
    })
 
    res.render('movies/edit', { movie, selected: option })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.post('/movies/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { title, genre, plot, cast } = req.body
    await Movie.findByIdAndUpdate(id, {
      title,
      genre,
      plot,
      cast,
      // TODO: should be able to have multiple celebrities
      //cast: {$push: { cast }}
    }, { new: true })
    res.redirect(`/movies/${id}`)
  } catch (error) {
    next(new Error(error.message))
  }
})

module.exports = router;
