var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var authRouter = require("./routes/authRoutes");
var userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api", authRouter);
app.use("/", userRoutes);

module.exports = app;

