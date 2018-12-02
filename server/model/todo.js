var {
    mongoose
} = require('../db/mongoose');
var _Schema = mongoose.Schema;

var todoSchema = new _Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,

    },
    completed: {
        type: Boolean,
        minlength: 6,
        trim: true,
        default: false

    },
    completedAt: {
        type: Number,
        default: null

    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

var Todo = mongoose.model('todos', todoSchema);

module.exports = {
    Todo
}