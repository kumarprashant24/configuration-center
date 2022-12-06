const mongoose = require('mongoose');

const seeder = new mongoose.Schema(
          {
                    name:String
          }
);

module.exports = mongoose.model('seeder', seeder);
