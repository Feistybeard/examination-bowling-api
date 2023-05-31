const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;

const routes = require('./routes/index.js');

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log('Error connecting to database', error);
});
database.once('connected', () => {
  console.log('Connected to database');
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = database;
