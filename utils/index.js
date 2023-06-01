const moment = require('moment');
const uuid = require('uuid-random');
const pricePerAlley = 100;
const pricePerPerson = 120;

function isDateValid(date) {
  return moment(date).isValid();
}

function calculateTotalPrice(numberOfPeople, alleysToBook) {
  return pricePerAlley * alleysToBook.length + pricePerPerson * numberOfPeople;
}

function generateBookingId() {
  return uuid();
}

module.exports = {
  isDateValid,
  calculateTotalPrice,
  generateBookingId,
};
