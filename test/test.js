const expect = require('expect');
const request = require('supertest');
const {
    MongoClient,
    ObjectID
} = require('mongodb')
const {
    app
} = require('./../server/server');

const {
    Todo
} = require('./../server/model/todo');

const {
    User
} = require('./../server/model/user');

var todo = new Todo({
    text: "WWE"
})

app.post('/todoso', (req, res) => {

    todo.save().then((data) => {
        res.status(200).send(JSON.stringify(data, undefined, 2))
    }, (err) => {
        console.log("Error is :", err)
    }).catch((E) => {
        console.log("E is:", E);
    })


})


app.listen(4000, () => {
    console.log("Server is up at 5000");
})