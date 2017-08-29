const { Client } = require('pg');
const client = new Client({
  user: 'johnware15',
  host: 'localhost',
  database: process.env.NODE_ENV === 'test' ? 'Drive_By_Test' : 'Drive_By',
  port: '5432'
});
client.connect();

module.exports = client;
