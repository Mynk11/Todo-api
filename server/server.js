var config = require('./config/config');
var jwt = require('jsonwebtoken');
var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');
var app = express();

var port = process.env.PORT || 4000;


const {
    Todo
} = require('./model/todo');

const {
    User
} = require('./model/user');

const {
    mongoose
} = require('./db/mongoose');

var {
    authenticate
} = require('./middelware/authenticate');
var {
    login
} = require('./middelware/authenticate');

app.use(bodyParser.json());


app.post('/users', (req, res) => {
    console.log("req.body.email :", req.body.email);
    var data = _.pick(req.body, ['email', 'password'])
    /* var user = new User({
        email: data.email,
        password: data.password
    }) */
    var user = new User(data);
    if (user.email && user.password) {
        /*  user.save().then((D) => {
             if (!D) {
                 return res.status(404).send("Error not saved by users");
             }
             console.log("Saved Succesfully")
             return res.status(200).send(D);

         }).catch((e) => {
             console.log("User not saved because of validation");
             return res.status(404).send(e);
         }); */
        user.save().then((D) => {
            console.log("Saved Succesfully")
            return user.generateAuthToken()

        }).then((token) => {

            res.status(200).header('x-auth', token).send(user);
        }).catch((e) => {
            console.log("User not saved because of validation", e);

        });



    } else {
        return res.status(404).send("Error not saved");
    }

});


app.post('/todos', authenticate, (req, res) => {
    console.log("req.body.text :", req.body.text);

    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })
    var user = new User({

        email: "klt@ol.com",
        password: "123erd",

    })

    //** User.findByToken//custom method on model level to return to user
    //** user.generateAuthToken//method for individual instance to generate token for individual user


    todo.save().then((D) => {
        res.status(200).send(JSON.stringify(D, undefined, 2));
    }).catch((e) => {
        res.status(400).send(e);

    });

    Todo.find({
        text: "Marry no way simply"
    }).then((todos) => {
        // console.log("data is :", todos[0].text);

    }).catch((e) => {
        console.log("This error is from catch block", e);
    });

});

app.get('/', (req, res) => {
    var todo = new Todo({
        name: "synopsis",
        completed: "Acceltree",
        completedAt: "2018"
    });

    todo.save().then((D) => {
        res.status(200).send(JSON.stringify(D, undefined, 2));
    }).catch((e) => {
        res.status(400).send(e);

    });

    Todo.find().then((data) => {
        res.status(200).send({
            data
        });
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', authenticate, (req, res) => {

    Todo.find().then((data) => {
        res.status(200).send({
            _creator: req.user._id

        });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', authenticate, (req, res) => {

    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        res.status(200);
        Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((user) => {
            if (!user) {
                return res.status(404).send("ID Doesn't match")
            }
            res.status(200).send(user);
        }).catch((e) => {
            res.status(404).send("ID not found");
        })
    } else {
        return res.status(404).send("Error not Found");
    }


});
app.delete('/todos/:id', authenticate, (req, res) => {

    var id = req.params.id;
    console.log("Deleted is called on id: from delete", id);
    if (ObjectID.isValid(
            id

        )) {

        Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        }).then((user) => {
            if (!user) {
                res.status(404).send("ID Doesn't match")
            } else {
                res.staus(200).send("user is deleted");
            }
        }).catch((e) => {
            res.status(404).send(e);
        })
    } else {
        return res.status(404).send("Input Id is invalid!!");
    }


});
app.patch('/todos/:id', authenticate, (req, res) => {

    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'completed']);
    //  console.log("body.completed & body.text", body.completed, body.name, req.body);
    if (ObjectID.isValid(id)) {
        if (body.completed !== null && body.completed !== null) {

            body.completedAt = new Date().getTime();

        } else {
            body.completed = false;
            body.completedAt = null;
            res.status(404).send("ID Doesn't match from patch")
        }

        Todo.findByOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {
            $set: body
        }, {
            new: true
        }).then((result) => {
            if (!result) {
                console.log("Updation unsuccesfull", result);
                return res.status(404).send("Updation unsuccess");
            }
            res.status(200).send("user is updated");
            return console.log("Updation succesfull ::", result);
        }).catch((e) => {
            console.log("Updation unsuccesfull from catch", e);
            res.status(404).send("Updation unsuccesfull");
        })
    } else {
        return res.status(404).send("Input Id is invalid!!");
    }


});



app.get('/users/me', authenticate, (req, res) => {
    res.status(200).send(req.user);
});


app.post('/users/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    console.log("Requested credentials is ", body.email, body.password);

    User.findByCredentials(body.email, body.password).then((data) => {
        console.log("REturned data from credentials is ", data);


        if (data === true) {
            console.log("Login permitted", data);
            res.status(200).send("Login succesfull");
        } else {
            res.status(400).send("Login unsuccesfull");
            console.log("Error from users/login");
        }



    }).catch((e) => {
        res.status(400).send("Login unsuccesfull");
        console.log("Error from users/login");
    })


});
app.delete('/users/me/token', authenticate, (req, res) => {
    console.log("Req.token is ", req.token);
    req.user.removeToken(req.token).then((data) => {
        console.log("returned data from removetoken is", data);
        res.status(200).send("Logout succesfull");
    }).catch((e) => {
        res.status(405).send("Logout unsuccesfull");
        console.log("Error from users/logout");
    })
});


app.listen(port, () => {
    console.log(`Server is set up at ${port}`);
})

//mongodb://todoapp:mayank11@ds159273.mlab.com:59273/todoapp

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