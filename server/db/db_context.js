const knex = require("knex");
const knexfile = require("./knexfile");
require('dotenv').config();

console.log("db_url:", process.env.DATABASE_URL);
const database = (process.env.NODE_ENV === "production") ? knex(knexfile.production) : knex(knexfile.development);

module.exports = database;
