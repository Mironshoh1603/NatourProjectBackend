const User = require('../modules/userModel');
const catchAsync = require('./../utility/catchAsync');

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'Succes',
    data: newUser,
  });
});

module.exports = { signUp };
