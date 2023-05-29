const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    report: {
        type: Object,
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;