const Joi = require('joi');
const express = require('express');
const app = express();
const { expressPort } = require('../config');

app.use(express.json());

const genres = [
  { id: 1, name: 'Animazione'},
  { id: 2, name: 'Avventura'},
  { id: 3, name: 'Biografico'},
  { id: 4, name: 'Commedia'},
  { id: 5, name: 'Documentario'},
  { id: 6, name: 'Drammatico'},
  { id: 7, name: 'Erotico'},
  { id: 8, name: 'Fantascienza'},
  { id: 9, name: 'Fantasy/Fantastico'},
  { id: 10, name: 'Guerra'},
  { id: 11, name: 'Horror'},
  { id: 12, name: 'Musical'},
  { id: 13, name: 'Storico'},
  { id: 14, name: 'Thriller'},
  { id: 15, name: 'Western'}
];

app.get('/', (req, res) => {
  res.send('Hello into Vidly');
});

// Get the list of genres
app.get('/api/genres', (req, res) => {
  res.send(genres);
})

// Add a genre to genres list
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);
})

app.put('api/genres/:id', (req, res) => {
  const genre = genres.find
})

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

app.listen(expressPort, () =>{
  console.log(`Vidly run and listening on ${expressPort}..`);
})
