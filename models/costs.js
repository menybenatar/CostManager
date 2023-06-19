const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the costs data
const costsSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
        min:0,
    },
    year: {
        type: Number,
        required: true,
        min:1970,
        max:2050
    },
    month: {
        type: Number,
        required: true,
        min:1,
        max:12
    },
    day: {
        type: Number,
        required: true,
        min:1,
        max:31
    },
    id: {
        type: Number,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['food', 'health', 'housing', 'sport', 'education', 'transportation', 'other'],
        required: true
    },
    sum: {
        type: Number
    }
});
// Create a model based on the schema
const costs = mongoose.model('costs',costsSchema);

module.exports = costs;