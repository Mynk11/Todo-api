//c:\Program Files\MongoDB\Server\4.0\bin >> mongod.exe --dbpath /Users/Mayank/mongo-data


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var myUri = process.env.MONGODB_URI;
var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect(myUri, options).then((e) => console.log("from sucees DB Connected")).catch((e) => console.log("from error" + e));



module.exports = {
    mongoose
}