/* var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp"); */
//mongoose.connect("mongodb://localhost:27017/TodoApp");


module.exports = {
    mongoose
}
//c:\Program Files\MongoDB\Server\4.0\bin >> mongod.exe --dbpath /Users/Mayank/mongo-data
//console.log("process.env.MONGOLAB_URI", process.env.MONGODB_URI);

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var myUri = process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp";


mongoose.connect(myUri, options).then((e) => console.log("from sucees DB Connected")).catch((e) => console.log("from error" + e));
//mongoose.connect("mongodb://localhost:27017/TodoApp");


module.exports = {
    mongoose
}

//console.log("process.env.MONGOLAB_URI", process.env.MONGODB_URI);