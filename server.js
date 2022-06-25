process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});
const mongoose = require('mongoose');
const env = require('dotenv');
env.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {}).then(() => {
  console.log('DB connected...');
});
// .catch((err) => {
//   console.log(`err : ${err}`);
// });

const PORT = process.env.PORT || 8000;
app.listen(PORT, env.URL);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
