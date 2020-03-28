const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const PORT = process.env.PORT || 8000;
app.listen(PORT, '127.0.0.1', () =>
  console.log(`App runnind and listening on port ${PORT}`)
);
