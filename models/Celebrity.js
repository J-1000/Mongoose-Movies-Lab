const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const celebritySchema = new Schema(
	{
		name: {
			type: String,
			require: true,
			unique: true,
		},
		occupation: {
			type: String,
			enum: ['actor', 'singer', 'comedian', 'unknown'],
			require: true,
		},
		catchPhrase: {
			type: String,
			require: true,
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		versionKey: false, //   versionKey: false,  quita el key de cada elemento
		timestamps: true,
	}
);

const Celebrity = model('Celebrity', celebritySchema);

module.exports = Celebrity;
