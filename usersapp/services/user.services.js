const user = require('../models/user.model')

function findAll() {
  const result = user.find();
  return result;
}

function findOne(username) {
  const result = user.findOne({ username: username })
  return result
}

module.exports = { findAll, findOne, findLastInsertedUser }

async function findLastInsertedUser() {
  console.log('Find last inserted user')

  try {
    const result = await user.find().sort({ _id: -1 }).limit(1)
    console.log('Success in finding last inserted user', result[0].username)
    return result[0]
  } catch (err) {
    console.log('Problem in finding last inserted user', err)
    return false
  }
} 