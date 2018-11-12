var {
    mongoose
} = require('../db/mongoose');
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    name: String,
    completed: String,
    completedAt: String
});

var Todo = mongoose.model('todos', SomeModelSchema);

module.exports = {
    Todo
}