const mongoose = require("mongoose");

const marketTypes = new mongoose.Schema(
  {
    bet_option: { type: String, required: true },
    sport_id: { type: String, required: true },
    enabled: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("marketType", marketTypes);
