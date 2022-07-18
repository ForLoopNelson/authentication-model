const Mongoose = require("mongoose")
require("dotenv").config()
// const RemoteDB = process.env.DB_KEY

let db,
  dbConnectionString = process.env.DB_key,
  dbName = "Auth_test",
  collection

const connectDB = async () => {
  await Mongoose.connect(dbConnectionString).then((client) => {
    console.log(`Connected to ${dbName}`)
    // db = client.db(dbName)
    // collection = db.collection("Auth_test")
  })
}

module.exports = connectDB
