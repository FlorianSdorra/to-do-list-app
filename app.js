const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// ROUTERS
const indexRouter = require("./routes/index");
const tasksRouter = require("./routes/tasks");
const {
    setCors
} = require("./middleware/security");

// INIT
const app = express();

// LOGGING
app.use(logger("dev"));

// CONNECT TO DB

mongoose.connect("mongodb+srv://flo:krjAXHmI6Br0ueAl@todocluster-5dky8.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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

// krjAXHmI6Br0ueAl