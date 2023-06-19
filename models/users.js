const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the users data
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

// Create a model based on the schema
const users = mongoose.model('users', usersSchema);

module.exports = users;