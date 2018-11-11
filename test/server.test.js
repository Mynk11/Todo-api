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

//var id = "5be7d416c124f91cd00311cc";
var todo = [{
    _id: new ObjectID(),
    text: "first"
}, {
    _id: new ObjectID(),
    text: "second"
}, {
    _id: new ObjectID(),
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

describe("#GET /USer/:id", () => {
    it("Should get user with valid id", (done) => {
        request(app)
            .get(`/todos/${todo[0]._id.toHexString()}`)
            .expect(200)

            .expect((res) => {
                console.log("Response is :", res.body.text);
                console.log(`res.body.user.length`, Object.keys(res.body).length);
                expect(Object.keys(res.body).length).toBe(4);
            }).end((err, res) => {
                if (err) {
                    return console.log("Error from test 4", err);
                }
                // console.log("Running Successfully", res.text);

            });


        Todo.findById(todo[0]._id).then((user) => {
            console.log("length :", user.id, Object.keys(user).length);
            //  expect(user.length).toBeMoreThan(1).toBeA('number');
            done();
        }).catch((e) => {
            console.log("Error is from catch block", e);
            done();
        });



    });
    describe("#GET /USer/:invalidid", () => {
        it(" Invalid id", (done) => {
            var id = "5be7d416c124f91cd00311cc";
            request(app)
                .get(`/todos/${id.toString()}`)
                .expect(404)

                .expect((res) => {
                    console.log("Response is :", res.body);

                }).end((err, res) => {
                    if (err) {
                        return console.log("Error from test 4", err);
                    }
                    // console.log("Running Successfully", res.text);

                });


            Todo.findById(id).then((user) => {
                //console.log("length :", Object.keys(user).length);
                // expect(Object.keys(user).length).toBe(null);

                if (!user) {
                    done();
                    return console.log("Test cases pass");

                }


            }).catch((e) => {
                console.log("Error is from catch block", e);
                done();
            });



        });





    });




});

describe('#Empty_ID', () => {
    it(" #Empty_id_404", (done) => {
        var id = "adc";
        request(app)
            .get(`/todos/${id.toString()}`)
            .expect(404)

            .expect((res) => {
                console.log("Response is from empty id :", res.status);

                expect(res.status).toBe(404);
                done();
            }).end((err, res) => {
                if (err) {
                    done();
                    return console.log("Error from test 4 empty id :", err);

                }
                // console.log("Running Successfully", res.text);

            });

    });
})