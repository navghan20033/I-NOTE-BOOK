const mongoose = require('mongoose');
//Schema of user that stores in data base
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unqiue: false
  },
  password: {
    type: String,
    required: true
  
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchema)