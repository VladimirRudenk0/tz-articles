const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const connectDB = async () = {
  module.exports = {
    development: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: 'postgres',
    },
    test: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: 'postgres',
    },
    production: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: 'postgres',
    }
  };
}
