var express = require('express');
var bodyParser = require('body-parser');

var app = express();


var {
    Todo
} = require('./model/todo');
var {
    User
} = require('./model/user');

var {
    mongoose
} = require('./db/mongoose');

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    console.log(req.body);

    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((D) => {
        res.status(200).send(JSON.stringify(D, undefined, 2));
    }).catch((e) => {
        res.status(400).send(e);

    })

});


app.listen(3000, () => {
    console.log("Server is set up at 3000");
})


















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