//const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb')

var idn = new ObjectID();
console.log(idn);
var user = {
    name: "mayank",
    age: 25
};
var {
    name
} = user; //object destruction
console.log("Name is", name)
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to MongoDB");
    }
    console.log("MongoDB is connected");
    /*  db.collection('users').remove({}).then((result) => {
         console.log("Result is " + result)
     }, (e) => {
         console.log(e);
     }) */
    db.collection('todos').deleteOne({
        name: "mayank"
    }).then((result) => {
        console.log("Result is " + result)
    }, (e) => {
        console.log(e);
    })
    db.close();
});