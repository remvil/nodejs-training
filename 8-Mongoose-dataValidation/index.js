const mongoose = require('mongoose');
const { mongoDBport } = require('../config');
const { mongoDBhost } = require('../config');

console.log(`Connecting to MongoDB host ${mongoDBhost} on port ${mongoDBport}`);

mongoose.connect(`mongodb://${mongoDBhost}:${mongoDBport}/playground`, {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowecase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(v, callback){
        setTimeout(()=>{
          // Do some async work
          const result = v && v.length > 0;
          callback(result)
        }, 500);
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price:{
    type: Number,
    required: function(){ return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Node.js Course',
    author: 'Remigio',
    category: 'web',
    tags: ['frontend'],
    // tags: null,
    isPublished: true,
    price: 15.8

  });
  try {
    const res = await course.save();
    console.log(res);
  } catch (e) {
    for(field in e.errors)
      console.error(e.errors[field].message);
    // console.error(e.message);
  } finally {

  }

}
// createCourse()

async function getCourses(){
  // Pagination
  const pageNumber = 2
  const pageSize = 10;

  const courses = await Course
  // .find({ isPublished: true })
  // .find({ price: { $gt: 10, $lte: 20 } })

  // Regexp examples
  // .find({author: /ˆRemi/i }) // Starts with
  // .find({ author: /Vildacci$/i }) // Ends with
  // .find({author: /.*emig.*/ }) // contains

  // Pagination
  // .skip((pageNumber -1) * pageSize)
  // .limit(pageSize)
  .find({ _id: '5c4793f641a637ba841e1001'})
  // .limit(10)
  .sort({ name: 1 })
  .select({ name: 1, tags: 1, price: 1});
  // .select({ name: 1, tags: 1})

  // Counting
  // .count();
  console.log(courses[0].price);
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
// removeCourse('5c4529766ebbe0984c2c7d5d')
