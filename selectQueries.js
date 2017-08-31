const client = require('./pg');
const bcrypt = require('bcrypt');

const selectDriversText = `SELECT email, password FROM drivers WHERE email = $1`;
const selectRidersText = `SELECT email, password FROM riders WHERE email = $1`;
const selectDriversEmailText = `SELECT email FROM drivers WHERE email = $1`;
const selectRidersEmailText = `SELECT email FROM riders WHERE email = $1`;

const selectDrivers = function(text, values, password) {
  //since you are reassigning the value of dbPassword on line 15 you can just
  //let dbPassword. This creates a useable variable which you assign on line 15
  let dbPassword = ""
  return client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].password
    return bcrypt.compare(password, dbPassword)
    .then(result => result) //then(result => result) does nothing, why need?
  })
  .catch(error => {
    console.log('Did not find driver');
    console.log(error);
  })
}

const selectRiders = function(text, values, password) {
  //see comment above
  let dbPassword =""
  return client.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].password
    return bcrypt.compare(password, dbPassword)
    .then(result => result) //see comment above
  })
  .catch(error => {
    console.log('Did not find rider');
    console.log(error);
  })
}

const selectDriversEmail = function(text, values) {
  return client.query(text, values)
  .then(result => result.rows[0].email)
  .catch(error => {
    console.log(error);
    return undefined
  })
}

const selectRidersEmail = function(text, values) {
  return client.query(text, values)
  .then(result => result.rows[0].email)
  .catch(error => {
    console.log(error);
    return undefined
  })
}

module.exports = {
  selectDriversText,
  selectRidersText,
  selectDrivers,
  selectRiders,
  selectDriversEmailText,
  selectDriversEmail,
  selectRidersEmail,
  selectRidersEmailText
}
