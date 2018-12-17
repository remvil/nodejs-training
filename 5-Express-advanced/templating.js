const debug = require('debug')('app:*n');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger')
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// https://www.npmjs.com/package/helmet
// Helmet helps secure Express apps by setting various HTTP headers.
// It's best to use Helmet early in your middleware stack so that its headers are sure to be set.
app.use(helmet());

// Configuration using config package
console.log("Application Name: " + config.get('name'));
console.log("Mail Server: " + config.get('mail.host'));
console.log("Mail Passwd: " + config.get('mail.password'));

// Debugger
// Works with export NODE_ENV=development
if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  debug('Morgan Enabled...');
}

app.use(logger);

const courses = [
  { id: 1, name:'course1' },
  { id: 2, name:'course2' },
  { id: 3, name:'course3' }
];

app.get('/', (req,res) =>{
  res.render('index.pug',{
    title: "My Express App",
    message: "Hello World"
  })
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.post('/api/courses', (req, res) => {
  // Validate - If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name + (courses.length+1)
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Lookup the courses
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The course with the given ID was not found');

  // Validate - If invalid, return 400 - Bad request
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.status(400).send(error.details[0].message);

  // Update courses
  course.name = req.body.name;
  res.send(course);
})

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course, schema);
}

app.delete('/api/courses/:id', (req, res) => {
  // Lookup the courses
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given ID was not found');
  res.send(course);
});


const port = process.env.PORT || 3000
app.listen(port, () =>  console.log(`Listen on port ${port}...`));
