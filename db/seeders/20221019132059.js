const Menu = require("../../models/menu.model");
const menu = require("../../seeds/menu.json");
const Seeder = require("../../models/seeders.model");

module.exports.Up = async () => {
  try {
    await Menu.insertMany(menu);
  } catch (err) {
    throw err;
  }
};
module.exports.Down = async () => {
  try {
    const res = await Menu.deleteMany();
    if (res.acknowledged) {
      await Seeder.delete({ name: __filename.split("/").pop() });
      console.log("menu dropped successfully");
    }
  } catch (err) {
    throw err;
  }
};