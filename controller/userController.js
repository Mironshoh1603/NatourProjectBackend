const catchAsync = require('./../utility/catchAsync');

const getAllUsers = catchAsync((req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This Callback function is not defined',
  });
});
const addUser = (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'This Callback function is not defined',
  });
};
const getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This Callback function is not defined',
  });
};
const deleteUser = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'This Callback function is not defined',
  });
};
const updateUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'This Callback function is not defined',
  });
};

module.exports = { getAllUsers, getUser, deleteUser, updateUser, addUser };
