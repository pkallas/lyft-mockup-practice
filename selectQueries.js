const client = require('./pg');
const bcrypt = require('bcrypt');
const selectDriversText = `SELECT email, password FROM drivers WHERE email = $1`;
const selectRidersText = `SELECT email, password FROM riders WHERE email = $1`;
const lastTransactionDriversText = `SELECT last_transaction FROM drivers WHERE email = $1`;
const lastTransactionRidersText = `SELECT last_transaction FROM riders WHERE email = $1`;

function selectDrivers (text, values, password) => {
  let dbPassword = ""
  client.query(text, values)
  .then(result => dbPassword = result.rows[1])
  .catch(error => {
    console.log('Did not find driver');
    console.log(error);
  })
  .then(result => bcrypt.compare(password, dbPassword))
  .then(result => return result)
}

function selectRiders (text, values, password) => {
  let dbPassword = ""
  client.query(text, values)
  .then(result => dbPassword = result.rows[1])
  .catch(error => {
    console.log('Did not find rider');
    console.log(error);
  })
  .then(result => bcrypt.compare(password, dbPassword))
}

function lastTransactionDrivers (text, values) => {
  let transaction
  client.query(text, values)
  .then(result => transaction = result.rows[1])
  .catch(error)
}

function lastTransactionRiders (text, values) => {
  let transaction
  client.query(text, values)
  .then(result => transaction = result.row[1])
  .catch(error)
}

module.exports = {
  selectDriversText,
  selectRidersText,
  lastTransactionDriversText,
  lastTransactionRidersText
}
