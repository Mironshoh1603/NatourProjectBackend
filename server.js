const mongoose = require('mongoose');
const env = require('dotenv');
env.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {}).then(() => {
  console.log('DB connected...');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, env.URL);
