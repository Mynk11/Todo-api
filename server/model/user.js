var {
    mongoose
} = require('../db/mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    email: String
});

var User = mongoose.model('Users', ModelSchema);
module.exports = {
    User
}