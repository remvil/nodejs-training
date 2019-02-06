require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');

module.exports = function () {
    // ERROR HANDLINGS
    winston.handleExceptions(
        new winston.transports.Console({ colorize:true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => { throw ex; } );

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        level: 'error',
        db: config.get('MongoDBUrl')
    });

    // TEST GENERIC ERROR
    // throw new Error('Something failed during startup.');

    // TEST HANDLE PROMISES REJECTED
    // const p = Promise.reject(new Error('Something failed miserably!'));
    // p.then(() => console.log('Done'));

}