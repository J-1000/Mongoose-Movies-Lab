const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
 
const dbName = 'movies-lab';
mongoose.connect(`mongodb://localhost/${dbName}`);
 

const movies = [
  {
  title: 'The Shining',
  genre: 'Suspense',
  plot: 'Big hotel with crazy guy',
  cast: [ {
        name: "Jack Nicholson",
        occupation: "Psycho",
        catchphrase: "Here’s Johnny!"
      } ]
}, 
{
  title: 'Taxi Driver',
  genre: 'Action',
  plot: 'Mean taxi driver',
  cast: [ {
        name: "Robert DeNiro",
        occupation: "Taxi Driver",
        catchphrase: "You Talkin' To Me?"
      } ]
}
];

// const celebrities = [
//   {
//     name: "Robert DeNiro",
//     occupation: "Taxi Driver",
//     catchphrase: "You Talkin' To Me?"
//   },
//   {
//     name: "Jack Nicholson",
//     occupation: "Psycho",
//     catchphrase: "Here’s Johnny!"
//   },
//   {
//     name: "Heath Ledger",
//     occupation: "Batman Hater",
//     catchphrase: "Why So Serious?"
//   }
// ];

movies.forEach(movie => {
  Celebrity.create(movie.cast).then(oneCeleb => {
    movie.cast = oneCeleb._id;
    Movie.create(movie)
  })
})
 
// Celebrity.create(celebrities, (err) => {
//   if (err) { throw(err) }
//   console.log(`Created ${celebrities.length} celebrities.`)
//   mongoose.connection.close();
// });