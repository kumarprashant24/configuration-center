const mongoose = require("mongoose");

const cfgSchema = new mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    configType: { type: String, required: true },
    config: {
        jurisdiction: [{ type: String,required: true }],
        marketName: { type: String, required: true },
        enabled: { type: Boolean, default: true },
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("configurations", cfgSchema);
