const mongoose = require("mongoose"); 
const Celebrity = require("../models/Celebrity"); 

const celebrities = [
    {
        name: "Tom Cruise", 
        occupation: "Scientology fanboy", 
        catchPhrase: "You're glib Matt!"
    }, 
    {
        name: "Kim Kardashian", 
        occupation: "Pro airhead", 
        catchPhrase: "Okurrrr"
    }, 
    {
        name: "Gordon Ramsey", 
        occupation: "Chef", 
        catchPhrase: "Where is the lamb sauce"
    }
]

Celebrity.insertMany(celebrities)
    .then(celebrity => {
        console.log(`Success - ${celebrity.length} movies got created`)
        mongoose.connection.close()
    })

mongoose.connect("mongodb://localhost/mongoose-movies-development", {
    useNewUrlParser: true,
})
.then(() => { 
    return Celebrity.create(celebrities);
})
.catch(err => console.log(err));
