const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
const runSeeders = require('./runSeeders');

module.exports.dbconnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connect to database");
    runSeeders();
  } catch (e) {
    console.log(e);
  }
};
