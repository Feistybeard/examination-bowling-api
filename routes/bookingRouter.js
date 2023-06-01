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

router.get('/getByDates', bookingController.getBookingsByDates);

router.post(
  '/create',
  checkAllFields,
  checkTime,
  checkDate,
  checkShoesQuantity,
  checkWhichAlleysBooked,
  bookingController.createBooking
);

router.put(
  '/update/:id',
  checkAllFields,
  checkTime,
  checkDate,
  checkShoesQuantity,
  checkWhichAlleysBooked,
  bookingController.updateBooking
);

router.delete('/delete/:id', bookingController.deleteBooking);

module.exports = router;
