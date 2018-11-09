//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb')

var idn = new ObjectID();
console.log(idn);
var user = { name: "mayank", age: 25 };
var { name } = user;//object destruction
console.log("Name is", name)
MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        return console.log("Unable to connect to MongoDB");
    }
    console.log("Mongo DB is Connected");
    //deleteMany
    /* db.collection('Users').deleteMany({ name: "shivi" }).then((data) => {
        console.log("Deleted_1", data);
    }).catch((err) => {
        console.log("Error in deletemany", err);
    }); */

    //deleteOne
    /* db.collection('Users').deleteOne({ name: "shivi" }).then((data) => {
        console.log("Deleted from db", data);
    }).catch((err) => {
        console.log("Error in deletemany", err);
    }); */
    db.collection('Todos').findOneAndUpdate({ age: 24 }, {
        $set: {
            age: 30
        }
    }, {
            returnOriginal: false
        }).then((data) => {
            console.log("Updated in db", data);
        }).catch((err) => {
            console.log("Error in Updation", err);
        });


    //findoneanddelete
});
