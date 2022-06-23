const mongoose = require('mongoose');
const env = require('dotenv');
env.config({ path: './config.env' });
const fs = require('fs');
const Tour = require('./../../modules/tourModel');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {}).then(() => {
  console.log('DB connected');
});
/// File reading
const fileData = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const importData = async () => {
  try {
    const data = await Tour.create(fileData);
    console.log('Data added Successfuly');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    const data = await Tour.deleteMany();
    console.log('Data deleted Successfuly');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == '--add') {
  importData();
} else if (process.argv[2] == '--delete') {
  deleteData();
} else {
  process.exit();
}

console.log(process.argv);
 