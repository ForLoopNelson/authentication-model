const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectDB = require("./db") //uses another file
const { adminAuth, userAuth } = require("./middleware/auth")

require("dotenv").config()

//calls the file to connect to DB
connectDB()

app.use(express.json())
app.use("/api/Auth", require("./auth/Route"))

// Routes
app.use("/api/auth", require("./Auth/route"))

app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.redirect("/")
})
app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))

const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running`)
})

process.on("unhandledRejection", (err) => {
  console.log(`An Error Occured: ${err.message}`)
  server.close(() => process.exit(1))
})
