const mongoose = require('mongoose');
const { mongoDBport } = require('../config');
const { mongoDBhost } = require('../config');

mongoose.connect(`mongodb://${mongoDBhost}:${mongoDBport}/playground`, {useNewUrlParser: true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [ authorSchema ]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
    // const course = await Course.findById(courseId);
    const course = await Course.update({ _id: courseId },{
      $set: {
        'author.name' : 'John Smith'
      }
      // $unset: {
      //   'author.name' : ''
      // }
    });
    // course.author.name = 'Remigio Vildacci'
    // course.save();
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save()
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save()
}

removeAuthor('5c4b677c1a1331e258397aa0', '5c4b6836f7c067e26b6818a6')
// addAuthor('5c4b677c1a1331e258397aa0',new Author({ name: 'Amy' }))

// createCourse('Node Course', [
//   new Author({ name: 'Remi' }),
//   new Author({ name: 'Lad' })
// ]);
// updateAuthor('5c4b5bf6857adde1c4c1773e');
