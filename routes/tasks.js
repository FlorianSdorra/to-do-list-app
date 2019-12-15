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
    let task = req.body;
    db.get('tasks').push(task)
        .last()
        .assign({
            id: Date.now().toString()
        })
        .write()

    res.status(200).send(task);
});

module.exports = router;