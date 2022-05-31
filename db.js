require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoUri, () => {})
    .then(console.log("Connected to Mongoose Successfully"))
    .catch((err) => console.log(err));
};
module.exports = connectToMongo;
