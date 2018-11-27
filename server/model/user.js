var validator = require('validator');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const _ = require('lodash');
var {
    mongoose
} = require('../db/mongoose');

var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true

    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

});

ModelSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject(); //it convert the mongodo object into the user object

    return _.pick(user, ['_id', 'email']);
}

ModelSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth'
    var _id = this._id.toHexString();

    var token = jwt.sign({
        _id,
        access
    }, 'abc123').toString()


    user.tokens = user.tokens.concat([{
        access,
        token
    }]);


    return user.save().then((D) => {

        return token;
    }).then((data) => {

        return data;
    }).catch((e) => {
        console.log("User not saved because of validation from methods");

    });
}
ModelSchema.statics.findByToken = function (token) {

    try {
        console.log("TOken is :", token)
        var decoded = jwt.verify(token, 'abc123');


    } catch (e) {
        console.log("Error from jwt verify", e);
        return Promise.reject();
    };

/* Just Added  to find a user*/
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth' //quotes is required when we have a dot in value

    }).then((data) => {
        console.log("user found by id");
        return data;
    }).catch((e) => {

        console.log("not able to find user");
    });

}

ModelSchema.statics.findByCredentials = function (email, password) {


    console.log("Email and password password to token is ", email, password);
    var hashedPasswd = "";
    return User.findOne({
        email
    }).then((data) => {
        if (!data) {
            return Promise.reject();

        }

        return new Promise(function (resolve, reject) {
            console.log("user found by id", data);
            hashedPasswd = data.password;
            console.log("Hashed password is ", hashedPasswd);
            bcrypt.compare(password, hashedPasswd, (err, user) => {
                //it returns true/false
                if (err) {
                    console.log("False");
                    reject();

                } else {
                    console.log("login is permitted", data);
                    resolve(user);
                }
            });

        });
    })

    // .catch((e) => {

    //     console.log("not able to find user");
    // });



}


ModelSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
        $pull: {
            tokens: {
                token //we can also pass token only b'coz property name is same as variable name
            }
        }
    });
};














ModelSchema.pre('save', function (next) {
    var user = this;
    var hashedPasswd = "";
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, salt) => {
                console.log("Generated salt is ", salt);
                user.password = salt;
                console.log("user", user);
                hashedPasswd = salt;
                next();
            });
            /*  bcrypt.compare(user.password, hashedPasswd, (err, data) => {
                 //it returns true/false
                 if (err) {
                     console.log("False");

                 } else {
                     console.log(data);

                 }
             }); */
        });

    } else {
        next();
    }
});
var User = mongoose.model('Users', ModelSchema);
module.exports = {
    User
}