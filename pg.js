const { Client } = require('pg');
const client = new Client({
  user: 'pkallas',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? '' : '',
  port: '5432'
});
client.connect();

module.exports = client;
