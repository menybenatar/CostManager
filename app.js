const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import routers
const addCostRouter = require('./routes/addCost');
const aboutRouter = require('./routes/about');
const reportRouter = require('./routes/report');

const app = express();

// Connect to MongoDB
const mongoose = require('mongoose');
const mongooseConnection = 'mongodb+srv://menybenatar:dYGBZOjXdAVQAyTk@cluster0.yjkfin5.mongodb.net/costManager';
mongoose.connect(mongooseConnection)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// View engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register routers
app.use('/addCost', addCostRouter);   // Router for '/addCost' path
app.use('/about', aboutRouter);       // Router for '/about' path
app.use('/report', reportRouter);     // Router for '/report' path

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));   // If no matching route is found, create a 404 error and pass it to the error handler
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');   // Render the 'error' template and send it as a response
});

module.exports = app;