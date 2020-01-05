const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);


exports.getTasks = (req, res, next) => {
    const tasks = db.get('tasks').value()
    res.status(200).send(tasks);
}

exports.getTask = (req, res, next) => {
    const {
        id
    } = req.params;
    const task = db.get('tasks').find({
        id
    });
    res.status(200).send(task);
}

exports.addTask = (req, res, next) => {
    const task = req.body;
    db.get('tasks').push(task)
        .last()
        .assign({
            id: Date.now().toString()
        })
        .write()

    res.status(200).send(task);
}

exports.deleteTask = (req, res, next) => {
    const {
        id
    } = req.params;
    const task = db.get('tasks').remove({
        id
    });
    res.status(200).send(task);
}

exports.updateTask = (req, res, next) => {
    const {
        id
    } = req.params;
    const dt = req.body;
    const task = db.get('tasks').find({
        id
    }).assign(dt).write();
    res.status(200).send(task);
}