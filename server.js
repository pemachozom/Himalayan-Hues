
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

/* MongoDB Atlas */
const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((con) => {
  console.log('DB connection successful');
}).catch(error => console.log(error));

const port = 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
