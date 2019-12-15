const express = require('express');
const router = express.Router();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const {
    getTasks,
    addTask
} = require('../controllers/tasksController');

/**
 * GET all tasks
 */
router.get('/', getTasks);


/**
 * POST a task
 */
router.post('/', addTask);

module.exports = router;