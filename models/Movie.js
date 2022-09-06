const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieSchema = new Schema(
	{
        title: {
			type: String,
			require: true,
			unique: true,
		},
        genre: String,
        plot: String,
        cast:[{
            type: Schema.Types.ObjectId,
            // this refers to the model the id above belongs to
            ref:'Celebrity'
        }]
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		versionKey: false, //   versionKey: false,  quita el key de cada elemento
		timestamps: true,
	}
);

const Movie = model('Movie', movieSchema);

module.exports = Movie;