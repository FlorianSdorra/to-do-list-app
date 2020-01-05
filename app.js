const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mongoose = require("mongoose");

// ROUTERS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const tasksRouter = require("./routes/tasks");
const {
    setCors
} = require("./middleware/security");

// INIT
const app = express();

// LOGGING
app.use(logger("dev"));

/** SETTING UP LOWDB */
const adapter = new FileSync("data/db.json");
const db = low(adapter);
db.defaults({
    tasks: [],
    users: []
}).write();

// CONNECT TO DB

mongoose.connect("mongodb://localhost:27017/to-do-list-app", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", console.error);
mongoose.connection.on("open", function () {
    console.log("Database connection established...");
});
// REQUEST PARSERS
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(setCors);


// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// ERROR HANDLING 

app.use(function (req, res, next) {
    const error = new Error("Looks like something is broken");
    error.status = 400;
    next(error)
});

app.use(function (err, req, res, next) {
    res.send({
        error: {
            message: err.message
        }
    });
});



// EXPORT PATH 
module.exports = app;