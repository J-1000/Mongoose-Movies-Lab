const mongoose =require('mongoose');
const router = require('../routes');
const Schema = mongoose.Schema;
const moviesSchema= new Schema({
 title: String,
 genre:String,
 plot:String, 
 cast:[{
    type: Schema.Types.ObjectId,
    ref: 'Celebrity'
 }]
})
router.get('/movies/:id', (req, res, next)=>{
   Movie.findById(req.params.id)
   .populate('cast')
   .then(movieByID=>{
      res.render('movies/show',{movie: movieByID})
   })
   .catch(err=> next(err))
})

const Movie = mongoose.model('Move' , movieSchema)
module.exports= Movie;
