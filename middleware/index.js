const utils = require('../utils');

function checkAllFields(req, res, next) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == '') {
      return res.send('Make sure required data is filled in');
    }
  }

  next();
}

function checkTime(req, res, next) {
  const { time } = req.body;

  if (time.split(':')[1] !== '00') {
    return res.status(400).json({
      success: false,
      message: 'You can only book in intervalls of 1 hour',
    });
  }

  if (time.split(':')[0] < 8 || time.split(':')[0] > 22) {
    return res.status(400).json({
      success: false,
      message: 'You can only book between 8:00 and 22:00',
    });
  }

  next();
}

function checkDate(req, res, next) {
  const { date } = req.body;
  const dateValid = utils.isDateValid(date);

  if (!dateValid) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid date',
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  const bookingDate = new Date(date).toISOString().slice(0, 10);

  if (bookingDate < today) {
    return res.status(400).json({
      success: false,
      message: 'You cannot book in the past',
    });
  }

  next();
}

function checkShoesQuantity(req, res, next) {
  const { numberOfPeople, shoeSizes } = req.body;

  if (numberOfPeople !== shoeSizes.length) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a shoe size for each person',
    });
  }

  next();
}

function checkWhichAlleysBooked(req, res, next) {
  const { alleysToBook } = req.body;

  if (alleysToBook.some((alley) => alley < 1 || alley > 8)) {
    return res.status(400).json({
      success: false,
      message: 'You can only book from alley 1 to 8',
    });
  }

  if (new Set(alleysToBook).size !== alleysToBook.length) {
    return res.status(400).json({
      success: false,
      message: 'You cannot book the same alley twice',
    });
  }

  next();
}

module.exports = {
  checkAllFields,
  checkTime,
  checkDate,
  checkShoesQuantity,
  checkWhichAlleysBooked,
};
