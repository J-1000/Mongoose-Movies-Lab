const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity')

mongoose.connect("")

const celebrities = [
    {
        name : 'Kristen Stewart',
        occupation : 'Actress',
        catchPhrase : 'Channel\'s Muse'
    },
    {  
        name : 'Tang Wei',
        occupation : 'Actress',
        catchPhrase : 'One of my favorites'
    },
    {
        name : 'Simon Baker',
        occupation : 'Actor',
        catchPhrase : 'The Best from down South'
    }
]

Celebrity.insertMany(celebrities)
.then(celebrities => {
    console.log(`Success - added ${celebrities.length} to the db`)
    mongoose.connection.close()
})
.catch(err => {
    console.log(err)
})
