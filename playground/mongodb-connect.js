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
    console.log("MongoDB is connected");
    //from windows command prompt 1:mongod.exe --dbpath /Users/Mayank/mongo-data
    //from command prompt 2:mongo.exe(from program files/mongodb/server/4.0/bin)
    db.collection('Todos').insertOne({

        name: "Mayank",
        lastname: "Gupta"

    }, (err, result) => {
        if (err) {
            return console.log("Error insertion failed 1", err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })//ops is refernce for inserted docs

    /*   db.collection('Users').insertOne({
          name: "shivi",
          sirname: "kakkar",
          location: "Delhi"
      }, (err, res) => {
          if (err) {
              return console.log("Error insertion failed")
          }
          console.log(res.ops[0]._id.getTimestamp());
  
      })
      db.close(); */
});
