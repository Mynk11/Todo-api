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

var todo = [{
    text: "first"
}, {
    text: "second"
}, {
    text: "third"
}]
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todo);
    }).then(() => {
        console.log("Todos inserted");
        done();
    }).catch((e) => {
        console.log("Todos is not inserted", e)
    });
});




describe("#POST /Todos", () => {
    it("Should create new todo", (done) => {
        var text = "first";

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


        Todo.find().then((todos) => {
            console.log("data is :", todos.length);

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


        Todo.find({
            text: ""
        }).then((todos) => {
            console.log("length :", todos.length);
            done();
        }).catch((e) => {
            console.log("Error is from catch block", e);
            done();
        });



    });
});


describe("#GET /Todos", () => {
    it("Should get all todos", (done) => {

        request(app)
            .get('/todos')
            .expect(200)

            .end((err, res) => {
                if (err) {
                    return console.log("Error from test 1", err);
                }
                // console.log("Running Successfully", res.text);
                expect((res) => {
                    expect(res.body.todos.length).toBe(3);
                })
            });


        Todo.find().then((todos) => {
            console.log("length :", todos.length);
            expect(todos.length).toBe(3).toBeA('number');
            done();
        }).catch((e) => {
            console.log("Error is from catch block", e);
            done();
        });



    });
});