const moment = require('moment');
const uuid = require('uuid-random');
const pricePerAlley = 100;
const pricePerPerson = 120;

function formatDate(date) {
  return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
}

function formatTime(time) {
  return moment(time, 'HH:mm').format('HH:mm');
}

function todaysDate() {
  return moment().format('DD/MM/YYYY');
}

function timeNow() {
  return moment().format('HH:mm');
}

function isDateValid(date) {
  return moment(date, 'DD/MM/YYYY').isValid();
}

function calculateTotalPrice(numberOfPeople, alleysToBook) {
  return pricePerAlley * alleysToBook.length + pricePerPerson * numberOfPeople;
}

function generateBookingId() {
  return uuid();
}

module.exports = {
  formatDate,
  formatTime,
  todaysDate,
  timeNow,
  isDateValid,
  calculateTotalPrice,
  generateBookingId,
};
