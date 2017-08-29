const client = require('./pg');
const bcrypt = require('bcrypt');
const selectDriversText = `SELECT email, password FROM drivers WHERE email = $1`;
const selectRidersText = `SELECT email, password FROM riders WHERE email = $1`;
const lastTransactionDriversText = `SELECT last_transaction FROM drivers WHERE email = $1`;
const lastTransactionRidersText = `SELECT last_transaction FROM riders WHERE email = $1`;

const selectDrivers = (text, values) => {
  let dbPassword = ""
  let clientPassword = ""
  client.query(text, values)
  .then(result => dbPassword = result.rows[1])
  .catch(error => {
    console.log('Did not find driver');
    console.log(error);
  })
  .then(result => bcrypt.compare(clientPassword, dbPassword))
}

const selectRiders = (text, values) => {
  let dbPassword = ""
  let clientPassword = ""
  client.query(text, values)
  .then(result => dbPassword = result.rows[1])
  .catch(error => {
    console.log('Did not find rider');
    console.log(error);
  })
  .then(result => bcrypt.compare(clientPassword, dbPassword))
}

const lastTransactionDrivers = (text, values) => {
  let transaction
  client.query(text, values)
  .then(result => transaction = result.rows[1])
  .catch(error)
}

const lastTransactionRiders = (text, values) => {
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
