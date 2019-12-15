const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

/**
 * GET all tasks
 */
router.get('/', function (req, res, next) {
    const tasks = db.get('tasks')
        .value()

    res.status(200).send(tasks)
});


/**
 * POST a task
 */
router.post('/', function (req, res, next) {
    res.send('Here we shall return the new stored task they user send');
});

module.exports = router;