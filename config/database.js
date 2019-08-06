require('dotenv').config();
module.exports = {
  database: "mongodb://localhost:27017/meansample",
  secret: process.env.MONGODB_SECRET
}