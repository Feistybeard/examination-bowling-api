const bookingModel = require('../model/booking.model');
const utils = require('../utils');

const bookingController = {
  getAllBookings: async (req, res) => {
    try {
      const bookings = await bookingModel.getAllBookings();

      if (!bookings)
        return res.status(404).json({ message: 'No bookings found' });

      return res.status(200).json({ success: true, bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await bookingModel.getBookingById(id);

      if (!booking)
        return res.status(404).json({ message: 'Booking not found' });

      return res.status(200).json({ success: true, booking });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getBookingsByDates: async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
      const bookings = await bookingModel.getBookingsByDates(
        startDate,
        endDate
      );

      if (!bookings.length)
        return res.status(404).json({ message: 'No bookings found' });

      return res.status(200).json({ success: true, bookings });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createBooking: async (req, res) => {
    try {
      const { date, time, numberOfPeople, shoeSizes, alleysToBook, email } =
        req.body;
      const checkBooking = await bookingModel.checkIfBookingExists(
        alleysToBook,
        date,
        time
      );

      if (checkBooking) {
        return res.status(400).json({
          success: false,
          message: checkBooking,
        });
      }

      const totalPrice = utils.calculateTotalPrice(
        numberOfPeople,
        alleysToBook
      );
      const bookingId = utils.generateBookingId();
      const booking = await bookingModel.createBooking({
        bookingId,
        date,
        time,
        numberOfPeople,
        shoeSizes,
        alleysToBook,
        email,
        totalPrice,
      });

      return res.status(201).json({ success: true, booking });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const { date, time, numberOfPeople, shoeSizes, alleysToBook, email } =
        req.body;
      const checkBooking = await bookingModel.checkIfBookingExists(
        alleysToBook,
        date,
        time
      );

      if (checkBooking) {
        return res.status(400).json({
          success: false,
          message: checkBooking,
        });
      }

      const totalPrice = utils.calculateTotalPrice(
        numberOfPeople,
        alleysToBook
      );
      const booking = await bookingModel.updateBooking(id, {
        date,
        time,
        numberOfPeople,
        shoeSizes,
        alleysToBook,
        email,
        totalPrice,
      });

      if (!booking || booking.length === 0)
        return res.status(404).json({ message: 'Booking not found' });

      return res.status(200).json({ success: true, booking });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await bookingModel.deleteBooking(id);

      if (!booking)
        return res.status(404).json({ message: 'Booking not found' });

      return res.status(200).json({ success: true, booking });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = bookingController;
