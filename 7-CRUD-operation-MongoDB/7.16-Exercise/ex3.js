const mongoose = require('mongoose');
const { mongoDBport } = require('../config');
const { mongoDBhost } = require('../config');

mongoose.connect(`mongodb://${mongoDBhost}:${mongoDBport}/playground`, {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
  // .find({ isPublished: true, tags: {$in: ['backend', 'frontend'] } })
  .find({ isPublished: true })
  .or([
    { price: { $gte: 15 } },
    { name: /.*by.*/ }
  ])
  .sort('-price')
  .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log('run..');
  console.log(courses);
}

run();
