const config = require('config');

module.exports = function () {
    // AUTH JWT CHECK
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}