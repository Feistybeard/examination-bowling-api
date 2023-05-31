const express = require('express');
const app = express();

const bookingRouter = require('./bookingRouter');

app.use('/booking', bookingRouter);

module.exports = app;
