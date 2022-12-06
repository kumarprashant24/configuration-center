const Seeders = require("../models/seeders.model");
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "seeders");

module.exports = () => {
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(async function (name) {
      try {
        const doesNameExist = await Seeders.findOne({ name });
        if (!doesNameExist) {
          require(`${path.join(__dirname, "seeders")}/${name}`).Up();
          const injectFile = new Seeders({ name });
          await injectFile.save();
          console.log(`${name} seeded`);
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
};
