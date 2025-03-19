const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async () => {
  return {
    development: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD || 'Spiridon_2017',
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: 'postgres',
      schema: process.env.PGSCHEMA
    },
    test: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD || 'Spiridon_2017',
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: 'postgres',
      schema: process.env.PGSCHEMA
    },
    production: {
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD || 'Spiridon_2017',
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      dialect: 'postgres',
      schema: process.env.PGSCHEMA
    }
  };
};

module.exports = connectDB;