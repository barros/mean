const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Get a user by Mongo-generated ID
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

// Get a user by their username
module.exports.getUserByUsername = function(username, callback) {
  const query = {username: username};
  User.findOne(query, callback);
}

// Add a user
module.exports.addUser = function(newUser, callback) {
  // Encrypt plain text password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePasswords = function(enteredPassword, hash, callback ) {
  bcrypt.compare(enteredPassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}