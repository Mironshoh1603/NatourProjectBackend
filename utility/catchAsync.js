const AppError = require('./appError');

const catchErrorAsync = (funksiya) => {
  const catchFunc = (req, res, next) => {
    funksiya(req, res).catch((err) => next(new AppError(err.message, 404)));
  };
  return catchFunc;
};

module.exports = catchErrorAsync;
