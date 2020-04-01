const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(`Uncaught exception! Shutting down...`);
  // use third party app to restart the service
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB connection succesful`));
// .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, '127.0.0.1', () =>
  console.log(`App runnind and listening on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(`Unhandeled rejection! Shutting down...`);
  // use third party app to restart the service
  server.close(() => {
    process.exit(1);
  });
});
