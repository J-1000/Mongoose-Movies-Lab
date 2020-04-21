  
const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity');


mongoose.connect('mongodb://localhost/movies', {
   useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});



const celebrities = [
    {
        name: "Jackson Wang",
        occupation: "Singer/Rapper",
        catchPhrase: "I'm BoyToy, it's my chance"

    },
       {
        name: "Grimes",
        occupation: "Singer/Songwriter",
        catchPhrase: "I'm a super-introverted person."

    },
       {
        name: "Britney Spears",
        occupation: "Singer",
        catchPhrase: "It's Britney, bitch"

    },
]

Celebrity.create(celebrities).then(data => {
    console.log("success");
    mongoose.connection.close();
}).catch(err => {
    console.log(err);
});