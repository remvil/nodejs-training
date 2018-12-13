// Create a module
// const log = require('./logger');
// log("Hello!!");

// OS - module
// const os = require('os');
// var totMem = os.totalmem()
// var freeMem = os.freemem()
// console.log('Total memory: ' + totMem);
// //Template string
// // ES6 / ES2015: ECMAScript 6
// console.log(`Total Memory: ${totMem}`);
// console.log(`Free Memory: ${freeMem}`);

// fs - module
// const fs = require('fs');
// const files = fs.readdirSync('./');
// console.log(files);
// fs.readdir('./', function(err, files){
//   if(err) console.log("Error: " + err);
//   else console.log('Result: ', files);
// });

// // Events
// const EventEmitter = require('events');
// const Logger = require('./logger');
// const logger = new Logger();
// // Registe a listener
// logger.on('messageLogged', (arg) => {
//   console.log('Listener called: ',  arg);
// });
//
// logger.log('message to You');

const http = require('http');
const server = http.createServer((req, res)=>{
  if (req.url === '/') {
    res.write('Hello world');
    res.end();
  }
  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }
});
server.listen(3000);

console.log('Listening on port 3000...');
