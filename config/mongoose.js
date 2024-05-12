// import mongoose
const mongoose = require('mongoose');

// mongodb url stored in env variable
const {DB_URL} = process.env;

mongoose.connect(DB_URL);
console.log('Successfully Connected to the database');