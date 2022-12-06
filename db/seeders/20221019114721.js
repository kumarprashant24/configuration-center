const Market_Types = require("../../models/market_types.model");
const market_types = require("../../seeds/market_types.json");
const Seeder = require("../../models/seeders.model");

module.exports.Up = async () => {
  try {
    await Market_Types.insertMany(market_types);
  } catch (err) {
    throw err;
  }
};
module.exports.Down = async () => {
  try {
    const res = await Market_Types.deleteMany();
    if (res.acknowledged) {

      await Seeder.delete({ name: __filename.split("/").pop() });
      console.log("market_types dropped successfully");
    }
  } catch (err) {
    throw err;
  }
};
