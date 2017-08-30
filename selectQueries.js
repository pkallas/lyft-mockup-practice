const client = require('./pg');
const bcrypt = require('bcrypt');
const selectDriversText = `SELECT email, password FROM drivers WHERE email = $1`;
const selectRidersText = `SELECT email, password FROM riders WHERE email = $1`;
const lastTransactionDriversText = `SELECT last_transaction FROM drivers WHERE email = $1`;
const lastTransactionRidersText = `SELECT last_transaction FROM riders WHERE email = $1`;

const selectDrivers = function(text, values, password, callback) {
  let dbPassword = ""
  client.query(text, values)
  .then(result => {
    console.log(result.rows[0])
    console.log(result.rows[0].password);
    dbPassword = result.rows[0].password
    bcrypt.compare(password, dbPassword)
    .then(result => {
      callback(result)
    })
  })
  .catch(error => {
    console.log('Did not find driver');
    console.log(error);
  })
}

// selectDrivers(selectDriversText, ["bastard@winterfell.com"], "jonsnow");

function selectRiders(text, values, password) {
  let dbPassword = ""
  client.query(text, values)
  .then(result => dbPassword = result.rows[0])
  .catch(error => {
    console.log('Did not find rider');
    console.log(error);
  })
  .then(result => bcrypt.compare(password, dbPassword))
  .then(result => result)
  .catch(error => console.log(error))
}

function lastTransactionDrivers(text, values) {
  let transaction
  client.query(text, values)
  .then(result => transaction = result.rows[0])
  .catch(error)
}

function lastTransactionRiders(text, values) {
  let transaction
  client.query(text, values)
  .then(result => transaction = result.rows[0])
  .catch(error)
}

module.exports = {
  selectDriversText,
  selectRidersText,
  lastTransactionDriversText,
  lastTransactionRidersText,
  selectDrivers,
  selectRiders
}
