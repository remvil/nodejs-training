const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:32768/mongo-exercises', { useNewUrlParser: true })
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
  .or([ { tags: 'backend'}, {tags:'frontend' } ])
  .sort('-price')
  .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log('run..');
  console.log(courses);
}

run();
