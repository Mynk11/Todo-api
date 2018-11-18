var config = require('./config/config');

var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
const {
    ObjectID
} = require('mongodb');
var app = express();

var port = process.env.PORT || 3000;


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
        name: "mayank",
        completed: "Acceltree",
        completedAt: "2018"
    })
    var user = new User({
        name: "Mayank"
        //email: "mynkgpt.11@gmail.com"
    })

    user.save().then((D) => {
        console.log("Saved Succesfully")
    }).catch((e) => {
        console.log("User not saved because of validation");

    });

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

app.get('/todos', (req, res) => {

    Todo.find().then((data) => {
        res.status(200).send({
            data
        });
    }, (e) => {
        res.status(400).send(e);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    if (ObjectID.isValid(id)) {
        res.status(200);
        Todo.findById(id).then((user) => {
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
app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;
    console.log("Deleted is called on id: from delete", id);
    if (ObjectID.isValid(id)) {

        Todo.findByIdAndRemove(id).then((user) => {
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
app.patch('/todos/:id', (req, res) => {

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

        Todo.findByIdAndUpdate(id, {
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