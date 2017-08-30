const client = require('./pg');
const bcrypt = require('bcrypt');

const insertIntoDriversText = `INSERT INTO drivers(first_name, last_name, email, password, car,
drivers_license, phone_number) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

const insertIntoDrivers = function (text, values) {
 let dbPassword = values[3];
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

const insertIntoRidersText = `INSERT INTO riders(first_name, last_name, email, password, phone_number)
VALUES ($1, $2, $3, $4, $5)`;

const insertIntoRiders = function (text, values) {
  return client.query(`INSERT INTO payment_info(card_number) VALUES(NULL)`)
  .then(result => {
    let dbPassword = values[3];
    return bcrypt.hash(dbPassword, 10)
    .then(hash => {
      values[3] = hash;
      return (client.query(text, values)
      .then(result => console.log('Successfully added data to riders table'))
      .catch(error => {
        console.log('Could not insert into riders table')
        console.log(error)
      })
    )
    })
    .catch(error => {
      console.log('Could not hash password')
      console.log(error)
    })
  })
  .catch(error => console.log(error))
}

const insertIntoPaymentInfoText = `UPDATE payment_info
SET card_number = $1, card_zip = $2, card_cvv = $3, card_exp = $4, card_type = $5
FROM riders
WHERE payment_info.payment_id = riders.payment_id`;

const insertIntoPaymentInfo = function (text, values) {
  return client.query(text, values)
  .then(result => console.log('Successfully added data to the payment_info table'))
  .catch(error => {
    console.log('Could not insert into payment_info table')
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
}
