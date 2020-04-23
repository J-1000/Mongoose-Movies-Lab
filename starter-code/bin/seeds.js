const mongoose = require('mongoose');
const Celebrity=require('../models/Celebrity');

mongoose.connect('mongodb://localhost/starter-code');

const celebrities=[
    {
        name: "Lady Gaga",
        occupation:'singer',
        catchPhrase:'I live for crazy clothes',
    },
    {
        name:'Donald Duck',
        occupation:'comic figure',
        catchPhrase:'quack',
    },
    {
        name:'Heidi Klum',
        occupation: 'model',
        catchPhrase:'Ich habe heute leider kein Foto für dich',
    }
]

Celebrity.create(celebrities).then((data) =>{
    console.log('Success');
    mongoose.connection.close()
}).catch(err => {
    console.log(err);
});