const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  NODE_ENV:     process.env.NODE_ENV,
  PORT:         process.env.PORT,
  CLARIFAI_KEY: process.env.CLARIFAI_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL
};
