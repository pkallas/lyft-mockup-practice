process.env.NODE_ENV = 'test';
const client = require('../pg');

const {
  selectDriversText,
  selectRidersText,
  lastTransactionDriversText,
  lastTransactionRidersText,
  selectDrivers,
  selectRiders,
  lastTransactionDrivers,
  lastTransactionRiders
} = require('../selectQueries.js');

const {
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
} = require('../insertQueries.js');

const expect = require('chai').expect;

describe('selectDrivers', function() {
  let driver = [
    "Aegon",
    "Taergaryon",
    "bastard@winterfell.com",
    "jonsnow",
    "Infinity Q6",
    "JS769309784",
    "3129805541"];
  before(function() {
    return insertIntoDrivers(insertIntoDriversText, driver).then((result) => {
    })
  })
  it('should return true if password matches', function() {
    return selectDrivers(selectDriversText, ["bastard@winterfell.com"], "jonsnow").then((result) => {
      expect(result).to.equal(true)
    })
  })
  after(function() {
    client.query('TRUNCATE TABLE drivers')
    .then(result => console.log('Truncated Table'))
    .catch(error => console.log(error))
  })
})
