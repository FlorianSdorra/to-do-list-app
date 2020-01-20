const mongoose = require('mongoose');
const {Schema} = mongoose;

const TasksSchema = new Schema ({
    text: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        default: new Date()
    },
    done: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Task', TasksSchema);