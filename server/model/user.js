var validator = require('validator');
const jwt = require('jsonwebtoken');
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
        _id
    }, access).toString()


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
var User = mongoose.model('Users', ModelSchema);
module.exports = {
    User
}