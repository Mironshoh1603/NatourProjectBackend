const express = require('express');
const ejs = require('ejs');
const AppError = require('./utility/appError');
const errorController = require('./controller/errorController');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();
const morgan = require('morgan');

app.set('view engine', 'ejs');

app.use(express.json());

app.use(morgan('common'));

app.use((req, res, next) => {
  req.time = Date.now();
  next();
});

app.use(express.static(`${__dirname}/public`));

tourRouter.param('', (req, res, next, val) => {
  console.log(val);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`This page not found: ${req.originalUrl}`, 404));
});

app.use(errorController);

module.exports = app;

// Better Errors and Refactoring
