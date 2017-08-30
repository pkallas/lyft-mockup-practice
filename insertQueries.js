const client = require('./pg');
const bcrypt = require('bcrypt');

const insertIntoDriversText = `INSERT INTO drivers(first_name, last_name, email, password, car,
drivers_license, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const insertIntoDrivers = function (text, values) {
  let dbPassword = values[3];
  console.log('dbPassword:', dbPassword);
  return bcrypt.hash(dbPassword, 10)
  .then(hash => {
    values[3] = hash;
    return client.query(text, values)
    .then(result => {
      console.log('Successfully added data to drivers table')
    })
    .catch(error => {
      console.log('Could not insert into drivers table')
      console.log(error)
    })
  })
  .catch(error => {
    console.log('Could not hash password')
    console.log(error)
  })
}

const insertIntoRidersText = `INSERT INTO drivers(first_name, last_name, email, password, phone_number)
VALUES ($1, $2, $3, $4, $5)`;

const insertIntoRiders = function (text, values) {
  let dbPassword = values[3].pop();
  bcrypt.hash(dbPassword, 10)
  .then(hash => {
    console.log('Successfully hashed the password')
    dbPassword = hash;
    values[3].unshift(dbPassword)
  })
  .catch(error => {
    console.log('Could not hash password')
    console.log(error)
  })
  .then(client.query(text, values)
    .then(result => console.log('Successfully added data to riders table'))
    .catch(error => {
      console.log('Could not insert into riders table')
      console.log(error)
    })
  )
}

const insertIntoPaymentInfoText = `INSERT INTO payment_info(card_number, card_zip, card_cvv,
card_exp, card_type) VALUES ($1, $2, $3, $4, $5)`;

const insertIntoPaymentInfo = function (text, values) {
  client.query(text, values)
  .then(result => console.log('Successfully added data to the payment_info table'))
  .catch(error => {
    console.log('Could not insert into riders table')
    console.log(error)
  })
}

const insertLastTransactionIntoDriversText = `SELECT email FROM drivers WHERE email = $1
INSERT INTO drivers(last_transaction) VALUES ($2)`

const insertLastTransactionIntoDrivers = function (text, values) {
  client.query(text, values)
  .then(result => console.log('Successfully added timestamp to the drivers table'))
  .catch(error => {
    console.log('Could not insert into drivers table')
    console.log(error)
  })
}

const insertLastTransactionIntoRidersText = `SELECT email FROM drivers WHERE email = $1
INSERT INTO drivers(last_transaction) VALUES ($2)`

const insertLastTransactionIntoRiders = function (text, values) {
  client.query(text, values)
  .then(result => console.log('Successfully added timestamp to the riders table'))
  .catch(error => {
    console.log('Could not insert into riders table')
    console.log(error)
  })
}

module.exports = {
  insertIntoDriversText,
  insertIntoDrivers,
  insertIntoRidersText,
  insertIntoRiders,
  insertIntoPaymentInfoText,
  insertIntoPaymentInfo,
  insertLastTransactionIntoDriversText,
  insertLastTransactionIntoDrivers,
  insertLastTransactionIntoRidersText,
  insertLastTransactionIntoRiders
}
