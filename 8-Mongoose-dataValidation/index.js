const mongoose = require('mongoose');
const { mongoDBport } = require('../config');
const { mongoDBhost } = require('../config');

mongoose.connect(`mongodb://${mongoDBhost}:${mongoDBport}/playground`, {useNewUrlParser: true})
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
createCourse()

async function getCourses(){
  // Pagination
  const pageNumber = 2
  const pageSize = 10;

  const courses = await Course
  .find({ isPublished: true })
  // .find({ price: { $gt: 10, $lte: 20 } })

  // Regexp examples
  // .find({author: /ˆRemi/i }) // Starts with
  // .find({ author: /Vildacci$/i }) // Ends with
  // .find({author: /.*emig.*/ }) // contains

  // Pagination
  // .skip((pageNumber -1) * pageSize)
  // .limit(pageSize)

  .limit(10)
  .sort({ name: 1 })
  // .select({ name: 1, tags: 1})

  // Counting
  // .count();
  // console.log(courses);
}
// createCourse();
getCourses();

async function updateCourse(id){
  // Approach: Query first
  // const course = await Course.findById(id);
  // if(!course) return;

  // Approach: Update first
  const result = await Course.update({ _id: id},{
    $set: {
      author: 'Mosh',
      isPublished: false
    }
  });

  // course.isPublished = true;
  // course.author= 'Remigio'

  // course.set({
  //   isPublished: true,
  //   author: 'Remigio Vildacci'
  // });

  // Modify its properties
  // const result = await course.save();
  console.log(result);

  //Approach: Update first
  // Update directly
}
// updateCourse('5c4529766ebbe0984c2c7d5d');

async function removeCourse(id){
  // Approach: Query first
  // const course = await Course.findById(id);
  // if(!course) return;

  // Approach: Update first
  const result = await Course.deleteOne({ _id: id});
  console.log(result);
}
removeCourse('5c4529766ebbe0984c2c7d5d')
