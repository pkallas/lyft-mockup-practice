const client = require('./pg');
const bcrypt = require('bcrypt');
const selectDriversText = `SELECT email, password FROM drivers WHERE email = $1`;
const selectRidersText = `SELECT email, password FROM riders WHERE email = $1`;

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

const selectRiders = function(text, values, password) {
  let dbPassword =""
  return client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].password
    return bcrypt.compare(password, dbPassword)
    .then(result => result)
  })
  .catch(error => {
    console.log('Did not find rider');
    console.log(error);
  })
}

module.exports = {
  selectDriversText,
  selectRidersText,
  selectDrivers,
  selectRiders
}
