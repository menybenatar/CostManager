const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// Import routers
const addcostRouter = require('./routes/addcost');
const aboutRouter = require('./routes/about');
const reportRouter = require('./routes/report');

const app = express();

// Connect to MongoDB
const mongoose = require('mongoose');
const mongooseConnection = 'mongodb+srv://menybenatar:dYGBZOjXdAVQAyTk@cluster0.yjkfin5.mongodb.net/CostManger';
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
app.use('/addcost', addcostRouter);
app.use('/about', aboutRouter);
app.use('/report', reportRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;