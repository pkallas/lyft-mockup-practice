const { Client } = require('pg');
// you can dymanically make user be set process.env.USER
const client = new Client({
  user: 'dianavashti',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'drive_by_test' : 'drive_by',
  port: '5432'
});
client.connect();

module.exports = client;
