const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('MongoDB connected...');
  } catch (error) {
    console.error(error.message);
    // terminate a node process (exit) with a 'failure' code of 'uncaoght fatal exception'
    process.exit(1);
  }
};

module.exports = connectDB;
