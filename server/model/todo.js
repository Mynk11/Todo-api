var {
    mongoose
} = require('../db/mongoose');


var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        default: "Empty"
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: 0,
        required: true

    }
});

module.exports = {
    Todo
}