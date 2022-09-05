const Celebrity = require('./models/Celebrity')

const celebrities = [
    {
        name: 'Silvester Stallone',
        occupation: 'Actor',
        catchPhrase: "You're the disease, and I'm the cure.",
    },
    {
        name: 'Jennifer Lopez',
        occupation: 'Singer',
        catchPhrase: "Whenever it feels uncomfortable, to tell the truth, that's often the most important time to tell it."
    },
    {
        name: 'Lorenzo Lamas',
        occupation: 'Actor',
        catchPhrase: "My mission in life was to make sure that there were no women walking around who didn't know me personally."
    }
]

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/movies_celebrities')
.then(console.log('Connected to DB'))
.catch(err => console.log('Couldnt connect, error: ' + err))

Celebrity.insertMany(celebrities)
.then(inserted => {
    console.log('Inserted: ' + inserted)
})
.catch(err => {
    console.log('Error: ' + err)
})
