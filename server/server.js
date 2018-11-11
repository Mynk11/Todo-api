var express = require('express');
var bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');
var app = express();


const {
    Todo
} = require('./model/todo');
const {
    User
} = require('./model/user');

const {
    mongoose
} = require('./db/mongoose');

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    console.log("req.body.text :", req.body.text);

    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((D) => {
        res.status(200).send(JSON.stringify(D, undefined, 2));
    }).catch((e) => {
        res.status(400).send(e);

    })

    Todo.find({
        text: "Marry no way simply"
    }).then((todos) => {
        // console.log("data is :", todos[0].text);

    }).catch((e) => {
        console.log("This error is from catch block", e);
    });





});


app.get('/todos', (req, res) => {

    Todo.find().then((data) => {
        res.status(200).send({
            data
        });
    }, (e) => {
        res.status(400).send(e);
    })
});



app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        res.status(200);
        User.findById(id).then((user) => {
            if (!user) {
                return res.status(404).send("ID Doesn't match")
            }
            res.send(user);
        }).catch((e) => {
            res.send("ID not found", e);
        })
    } else {
        return res.status(404).send("Error not Found");
    }


});

app.listen(3000, () => {
    console.log("Server is set up at 3000");
})


module.exports = {
    app
}









//Home directory ./
//parent directory ../
/* var Newdo = new Todo({
    text: "MyGk",
    completed: true
});
Newdo.save().then((D) => {
    console.log("Data is D:", D);
}).catch((e) => {
    console.log("Error Occured is e", e);
});


var User = new User({
    email: "mayankguptamg.11@gmail.com"
});
User.save().then((D) => {
    console.log("Data is D:", D);
}).catch((e) => {
    console.log("Error Occured is e", e);
}); */