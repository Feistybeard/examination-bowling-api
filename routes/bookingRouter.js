const { Router } = require('express');
const router = Router();
const bookingController = require('../controllers/booking.controller');
const {
  checkAllFields,
  checkWhichAlleysBooked,
  checkTime,
  checkDate,
  checkShoesQuantity,
} = require('../middleware');
// TODO: Add delete and update booking, add search for bookings by a date range
router.get('/getAll', bookingController.getAllBookings);

router.get('/getById/:id', bookingController.getBookingById);

router.post(
  '/create',
  checkAllFields,
  checkTime,
  checkDate,
  checkShoesQuantity,
  checkWhichAlleysBooked,
  bookingController.createBooking
);

module.exports = router;
