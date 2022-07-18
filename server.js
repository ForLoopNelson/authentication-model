const express = require("express")
const app = express()
const cors = require("cors")
const connectDB = require("./db") //uses another file

require("dotenv").config()

//calls the file to connect to DB
connectDB()

app.use(express.json())
app.use("/api/Auth", require("./auth/Route"))

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running`)
})

process.on("unhandledRejection", (err) => {
  console.log(`An Error Occured: ${err.message}`)
  server.close(() => process.exit(1))
})
