const {
    ObjectID
} = require('mongodb');
const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/model/todo');
const {
    User
} = require('./../server/model/user');


var id1 = "5be7313c81b23f1416a76c14"

var id = "5be689ec4aa415700ff0dcc0"

if (ObjectID.isValid(id)) {
    User.findById(id).then((todo) => {

        if (!todo) {
            return console.log("id doesn't match challenge");
        }
        console.log("User email is ", todo.email);
    }).catch((e) => {
        console.log("E 1 is :", e);
    });
} else {
    console.log("Id is not valid");
}

Todo.find({
    _id: id1
}).then((todos) => {
    console.log("todos", todos)
}).catch((e) => {
    console.log("E 2 is :", e);
});

Todo.findOne({
    _id: id1
}).then((todo) => {
    if (!todo) {
        return console.log("id doesn't match");
    }
    console.log("todo is :", todo);

}).catch((e) => {
    console.log("E 3 is :", e);
});
Todo.findById(id1).then((todo) => {

    if (!todo) {
        return console.log("id doesn't match");
    }
    console.log("todo is ", todo);
}).catch((e) => {
    console.log("E 1 is :", e);
});