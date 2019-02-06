const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
    // Fix "collection.ensureIndex is deprecated. Use createIndexes instead." Deprecation Waring
    mongoose.set('useCreateIndex', true);
    mongoose.connect(config.get('MongoDBUrl'), { useNewUrlParser: true })
        .then(() => winston.info(`Connected to MongoDB at ${config.get('MongoDBUrl')} ...`))
        // .catch(err => winston.error(`Could not connect to MongoDB at ${config.get('MongoDBUrl')}...`, err));
}