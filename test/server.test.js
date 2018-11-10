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

beforeEach((done) => {
    Todo.remove({}).then(() => done()).catch((e) => {
        console.log("Error from beforeEach", done(e));

    });
});

describe("#POST /Todos", () => {
    it("Should create new todo", (done) => {
        var text = "WWE";

        request(app)
            .post('/todos')
            .expect(200)
            .send({
                text
            }).end((err, res) => {
                if (err) {
                    return console.log("Error from test 1", err);
                }
                //console.log("Running Successfully", res.text);
            });


        Todo.find({
            text: "WWE"
        }).then((todos) => {
            console.log("data is :", todos.length, todos);

        }).catch((e) => {
            console.log("Error is from catch block", e);

        });

        MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
            if (err) {
                return console.log("Unable to connect to MongoDB");
            }
            console.log("MongoDB is connected");
            db.collection('todos').find().toArray().then((data) => {
                console.log("Running the text ", data[0].text);
                expect(data[0].text).toBe(
                    text
                );
                done();
            }).catch((err) => {
                console.log("Error from catch block:", err);
                done();
            });

        });

    });
});
describe("#POST /Todos", () => {
    it("Should  not create new todo with invalid data", (done) => {
        var text = " ";
        request(app)
            .post('/todos')
            .expect(400)
            .send({

            }).end((err, res) => {
                if (err) {
                    return console.log("Error from test 1", err);
                }
                // console.log("Running Successfully", res.text);
            });


        Todo.find().then((todos) => {
            console.log("length :", todos.length);
            done();
        }).catch((e) => {
            console.log("Error is from catch block", e);
            done();
        });



    });
});