
const User = require('../models/user.model');

exports.findAll = async (req, res) => {
  console.log('Find all users from collection users')

  try {
    const result = await User.find();
    res.json({ status: true, date: result })
  } catch (err) {
    console.log("Problem in reading users", err)
    res.json({ status: false, data: err })
  }
}

exports.findOne = async (req, res) => {
  
  let username = req.params.username;
  console.log("Find user with specific username")

  try {
    const result = await User.findOne({ username: username })
    res.json({ status: true, data: result })
  } catch (err) {
    console.log("Problem in finding user", err)
    res.json({ status: false, data: err })
  }
}

exports.create = async (req, res) => {
  console.log("Create User")

  let data = req.body;

  const newUser = new User({
    username: data.username,
    password: data.password,
    name: data.name,
    surname: data.surname,
    email: data.email,
    address: {
      area: data.address.area,
      road: data.address.road
    }
  })

  try {
    const result = await newUser.save();
    res.json({ status: true, data: result })

  } catch (err) {
    console.log('Problem in created user', err)
    res.json({ status: false, data: err })
  }
}