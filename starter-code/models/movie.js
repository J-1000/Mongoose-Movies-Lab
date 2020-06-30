const mongoose = require('mongoose');
const { schema } = require('./celebrity');
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title : {type:String,
    minlength:3},
    genre : String,
    plot : String,
    cast :[{
        type:Schema.Types.ObjectId,
        ref:'Celebrity'
    }]
}); 
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie ;
