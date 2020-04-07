const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

//UserSchema Definition
const UserSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    profile: {
      type: String
    }
  }
);

//Exporting the schema
module.exports = User = mongoose.model('User', UserSchema);

//Add new User
module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(newUser.password, salt, function(err, hash){
      if(err) throw err;
      newUser.password = hash;
      callback(newUser);
    });
  });
}

//Comapring passwords
module.exports.comparePasswords = function(userPassword, hash, callback){
  bcrypt.compare(userPassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}