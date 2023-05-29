const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: {
        type: Number
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    birthday: {
        type: Date
    }
});

const users = mongoose.model('users',usersSchema);

module.exports = users;