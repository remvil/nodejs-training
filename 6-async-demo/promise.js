const p = new Promise((resolve, reject) => {
  // Kick off some asynk work
  // ...
  setTimeout(() => {
    resolve({'name': 'Remigio'});
    reject(new Error('message'));
  },2000);

});

p
  .then(result => console.log('Result', result))
  .catch(err => console.log('Error', err.message));
