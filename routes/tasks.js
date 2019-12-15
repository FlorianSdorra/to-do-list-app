const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const {
    getTasks,
    addTask,
    getTask,
    deleteTask
} = require('../controllers/tasksController');

// get all task, add task etc.

router.
route('/').
get(getTasks).
post(addTask);

router.
route('/:id').
delete(deleteTask).
get(getTask);



module.exports = router;