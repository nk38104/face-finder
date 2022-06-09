const knex = require("knex");
const knexfile = require("./knexfile");
require('dotenv').config();


const database = (process.env.NODE_ENV === "production") ? knex(knexfile.production) : knex(knexfile.development);


module.exports = database;
