const mongoose = require("mongoose");
require("dotenv").config();
module.exports = {
  connectToDb: (cb) => {
    const connectionParams = {};

    mongoose
      .connect(process.env.MONGO_ATLAS, connectionParams)
      .then(() => {
        console.log("Connected to database successfully");
        return cb();
      })
      .catch((error) => {
        console.log(error);
        console.log("Could not connect to the database!");
        return cb(error);
      });
  },
  getDb: () => mongoose.connection,
};
