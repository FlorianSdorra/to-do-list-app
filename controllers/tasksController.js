const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

const Task = require('../models/Tasks');
const createError = require('http-errors');


exports.getTasks =  async (req, res, next) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks)
    } catch(e) {
        next(e);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
        if(!task) throw new createError.notFound();
        res.status(200).send(task);
    } catch(e){
        next(e);
    }
};

exports.addTask = async (req, res, next) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(200).send(task);
    } catch(e){
        next(e);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) throw new createError.notFound();
        res.status(200).send(task);
    } catch(e){
        next(e);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if(!task) throw new createError.notFound();
        res.status(200).send(task);
    } catch(e) {
        next(e);
    }
}