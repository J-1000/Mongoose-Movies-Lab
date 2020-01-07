const mongoose = require('mongoose');
const CelebritiesSchema = mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
});

const Celebrity = new mongoose.model('Celebrity', CelebritiesSchema);
module.exports = Celebrity;
