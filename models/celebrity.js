// Iteration #1: The Celebrity Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create the Celebrity model with the schema.
// Create the celebrity schema with name, occupation and catchPhrase.
const celebritySchema = new Schema({
    name: String,
    occupation: String,
    catchPhrase: String
});

// Export the Celebrity model.
const Celebrity = mongoose.model('Celebrity', celebritySchema)
module.exports = Celebrity;