require(".");

const Celebrity = require('../models/celebrity');

// Create an array of 3 objects, each with name, occupation and catchPhrase for our initial celebrities.
const celebritiesArr = [{
        name: "Tom Cruise",
        occupation: "Actor",
        catchPhrase: "Nothing ends nicely, that's why it ends"
    },
    {
        name: "Beyonce",
        occupation: "Singer",
        catchPhrase: "Your self-worth is determined by you. You don't have to depend on someone telling you who you are."
    },
    {
        name: "Michelle Obama",
        occupation: "Speaker",
        catchPhrase: "At fifty-four, I am still in progress, and I hope that I always will be."
    }
]

// Call the Celebrity model's create method with the array as argument. In the create method's callback, display feedback.
Celebrity.create(celebritiesArr, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log('Success!');
    }
});

// Check the database with the mongo command to confirm that your data was saved.
// mongo -> show databases; -> use celebrities-collection; -> show collections; ->  db.celebrities.find().pretty();