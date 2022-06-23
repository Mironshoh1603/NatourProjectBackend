module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || 'fail';
  err.message = err.message || 'not found';

  console.log(err);
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      status: err.status,
      stack: err.stack,
      message: err.message,
      error: err,
    });
  } else if (process.env.NODE_ENV === 'PRODUCTION') {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  next();
};
