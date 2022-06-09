require('dotenv').config();


console.log(process.env.DATABASE_URL);

module.exports = {
  development: {
    client:     process.env.DATABASE_CLIENT,
    connection: {
      host:     "127.0.0.1",
      database: process.env.DATABASE_NAME,
      user:     process.env.DATABASE_USER,
      password: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
};
