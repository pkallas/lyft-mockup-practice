process.env.NODE_ENV = 'test';

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
} = require('../insertQueries');
const expect = require('chai').expect;

describe('insertIntoDrivers', function() {
  it('Should insert data into the drivers table')
})
