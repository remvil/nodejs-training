const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

// function fillGenresCollection(){
  // const genres = [
  //   { id: 1, name: 'Animazione'},
  //   { id: 2, name: 'Avventura'},
  //   { id: 3, name: 'Biografico'},
  //   { id: 4, name: 'Commedia'},
  //   { id: 5, name: 'Documentario'},
  //   { id: 6, name: 'Drammatico'},
  //   { id: 7, name: 'Erotico'},
  //   { id: 8, name: 'Fantascienza'},
  //   { id: 9, name: 'Fantasy/Fantastico'},
  //   { id: 10, name: 'Guerra'},
  //   { id: 11, name: 'Horror'},
  //   { id: 12, name: 'Musical'},
  //   { id: 13, name: 'Storico'},
  //   { id: 14, name: 'Thriller'},
  //   { id: 15, name: 'Western'}
  // ];
  // for (var i = 2; i < genres.length; i++) {
  //   console.log(genres[i].name);
  //   let genre = new Genre({ name: genres[i].name });
  //   genre = await genre.save();
  // }
// }

// Get the list of genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// Add a genre to genres list
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
})

// Edit a genre
router.put('/:id', auth, async (req, res) => {
  const genre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name }, { new: true });

  // checks
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// Delete a genre
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// Get a single genre detail
router.get('/:id', (req, res) => {
  const genre = Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;