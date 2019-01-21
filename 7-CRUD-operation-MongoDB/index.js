const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:32771/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Node.js Course',
    author: 'Remigio',
    tags: ['node', 'backend'],
    isPublished: true
  });

  const res = await course.save();
  console.log(res);
}

async function getCourses(){
  // Pagination
  const pageNumber = 2
  const pageSize = 10;

  const courses = await Course
  .find({ author: 'Remigio', isPublished: true })
  // .find({ price: { $gt: 10, $lte: 20 } })

  // Regexp examples
  // .find({author: /ˆRemi/i }) // Starts with
  // .find({ author: /Vildacci$/i }) // Ends with
  // .find({author: /.*emig.*/ }) // contains

  // Pagination
  .skip((pageNumber -1) * pageSize)
  .limit(pageSize)

  .limit(10)
  .sort({ name: 1 })
  // .select({ name: 1, tags: 1})

  // Counting
  // .count();
  console.log(courses);
}
// createCourse();
getCourses();
