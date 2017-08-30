const { Client } = require('pg');
const client = new Client({
  user: 'johnware',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'drive_by_test' : 'drive_by',
  port: '5432'
});
client.connect();

module.exports = client;
