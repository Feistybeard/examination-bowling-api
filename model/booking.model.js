const Bookings = require('./booking.schema');

async function checkIfBookingExists(alleysToBook, date, time) {
  const bookings = await Bookings.find();
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.date === date &&
      booking.time === time &&
      booking.alleysToBook.some((alley) => alleysToBook.includes(alley))
  );
  const alreadyBookedAlleys = filteredBookings.map((booking) =>
    booking.alleysToBook.filter((alley) => alleysToBook.includes(alley))
  );
  const flattenedAlreadyBookedAlleys = [].concat(...alreadyBookedAlleys);
  const alreadyBookedMessage = flattenedAlreadyBookedAlleys.map(
    (alley) => `Alley ${alley} is already booked at ${time} on ${date}`
  );

  if (alreadyBookedMessage.length === 0) {
    return false;
  }

  return alreadyBookedMessage;
}

async function getAllBookings() {
  return await Bookings.find();
}

async function getBookingById(id) {
  return await Bookings.findOne({ bookingId: id });
}

async function getBookingsByDates(startDate, endDate) {
  return await Bookings.find({
    date: { $gte: startDate, $lte: endDate },
  });
}

async function createBooking(booking) {
  return await Bookings.create({
    bookingId: booking.bookingId,
    date: booking.date,
    time: booking.time,
    numberOfPeople: booking.numberOfPeople,
    shoeSizes: booking.shoeSizes,
    alleysToBook: booking.alleysToBook,
    email: booking.email,
    totalPrice: booking.totalPrice,
  });
}

async function updateBooking(id, booking) {
  return await Bookings.findOneAndUpdate(
    { bookingId: id },
    {
      date: booking.date,
      time: booking.time,
      numberOfPeople: booking.numberOfPeople,
      shoeSizes: booking.shoeSizes,
      alleysToBook: booking.alleysToBook,
      email: booking.email,
      totalPrice: booking.totalPrice,
    }
  );
}

async function deleteBooking(id) {
  return await Bookings.findOneAndDelete({ bookingId: id });
}

module.exports = {
  checkIfBookingExists,
  getAllBookings,
  getBookingById,
  getBookingsByDates,
  createBooking,
  updateBooking,
  deleteBooking,
};
