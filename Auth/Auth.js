const User = require("../model/User")
const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
  const { username, password } = req.body
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password less than six characters" })
  }
  try {
    //May need to remove try catch and update this section!!
    bcrypt.hash(password, 10).then(
      async (hash) =>
        await User.create({
          username,
          password: hash,
        }).then((user) =>
          res.status(200).json({
            message: "User successfully created",
            user,
          })
        )
    )
  } catch (err) {
    res.status(401).json({
      message: "User creation not successfull",
      error: error.message,
    })
  }
}

exports.login = async (req, res, next) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password is emptty",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(401).json({
        message: "Login unsuccessful",
        error: "User not found",
      })
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        result
          ? res.status(200).json({
              message: "Login successfull",
              user,
            })
          : res.status(400).json({ message: "Invalid Login" })
      })
    }
  } catch {
    res.status(400).json({
      messsage: "Something went wrong.",
      error: error.message,
    })
  }
}

exports.update = async (req, res, next) => {
  const { role, id } = req.body
  if (role && id) {
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          if (user.role !== "admin") {
            user.role = role
            user.save((err) => {
              if (err) {
                res.status(400).json({
                  message: "An error has occured",
                  error: err,
                  message,
                })
                process.exit(1)
              }
              res.status(201).json({
                message: "Update was successfull",
                user,
              })
            })
          } else {
            res.status(400).json({ message: "User is already an Admin" })
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error occured", error: error.message })
        })
    } else {
      res.status(400).json({
        message: "Role is not admin",
      })
    }
  } else {
    res.status(400).json({
      message: "Role or ID is missing",
    })
  }
}

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) => res.status(201).json({ message: "User deleted", user }))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occured", error: error.message })
    )
}
