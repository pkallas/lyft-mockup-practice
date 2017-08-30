const client = require('./pg');
const bcrypt = require('bcrypt');
const selectDriversText = `SELECT email, password FROM drivers WHERE email = $1`;
const selectRidersText = `SELECT email, password FROM riders WHERE email = $1`;
// const lastTransactionDriversText = `SELECT last_transaction FROM drivers WHERE email = $1`;
// const lastTransactionRidersText = `SELECT last_transaction FROM riders WHERE email = $1`;

const selectDrivers = function(text, values, password) {
  let dbPassword = ""
  return client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].password
    return bcrypt.compare(password, dbPassword)
    .then(result => result)
  })
  .catch(error => {
    console.log('Did not find driver');
    console.log(error);
  })
}
//
// const selectRiders = function (text, values, password) {
//   let dbPassword = ""
//   client.query(text, values)
//   .then(result => dbPassword = result.rows[0])
//     return bcrypt.compare(password, dbPassword)
//       .then(result => result)
//   }
//   .catch(error => {
//     console.log('Did not find rider');
//     console.log(error);
// })

const selectRiders = function(text, values, password) {
  let dbPassword =""
  client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0]
    return bcrypt.compare(password, dbPassword)
    .then(result => result)
  })
  .catch(error => {
    console.log('Did not find rider');
    console.log(error);
  })
}
// const lastTransactionDrivers = function (text, values) {
//   let transaction
//   client.query(text, values)
//   .then(result => transaction = result.rows[0])
//   .catch(error)
// }
//
// const lastTransactionRiders = function (text, values) {
//   let transaction
//   client.query(text, values)
//   .then(result => transaction = result.rows[0])
//   .catch(error)
// }

module.exports = {
  selectDriversText,
  selectRidersText,
  selectDrivers,
  selectRiders
}
