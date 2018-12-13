  // console.log(__filename);
  // console.log(__dirname);
  // var url = 'http://mylogger.io/log';
  // function log(message){
  //   //Send an HTTP request
  //   console.log(message);
  // }
  // module.exports = log;

const EventEmitter = require('events');
var url = 'http://mylogger.io/log';
class Logger extends EventEmitter{
  log(message){
    // Send an HTTP request
    console.log(message);
    // Raise an event
    this.emit('messageLogged', {id: 1, url: url });
  }
}

module.exports = Logger
