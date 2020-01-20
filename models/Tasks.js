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
        default: false
    }
});

module.exports = mongoose.model('Task', TasksSchema);