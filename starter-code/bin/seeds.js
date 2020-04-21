const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");

const dbName = "celebrity-db";
mongoose.connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Enter seed data here:

const celebs = [
    {
        name: "Buzz Lightyear",
        occupation: "actor",
        catchPhrase: "To the infinity and beyond"
    },
    {
        name: "Woody",
        occupation: "actor",
        catchPhrase: "There's a snake in my boot!"
    },
    {
        name: "Forky",
        occupation: "actor",
        catchPhrase: "I'm trash!"
    }
];

Celebrity.create(celebs, err => {
    if (err) {
        throw err;
    }
    console.log(`Created ${celebs.length} celebrities`);
    mongoose.connection.close();
});
