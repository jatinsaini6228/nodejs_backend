
const winston = require('../utils/Winston');
const {express, db} = require('../utils/RequiredPackages');
const conn = db.dbConn();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  username: String,
  first_name: String,
  last_name: String,
  full_name: String,
  email: { type: String,  unique: true },
  password: String,
  phone: String,
  about: String,
  profile_picture: String,
  role: String,
  parent_id: String,
  isEmailVerified: Boolean,
  isMobileVerified: Boolean,
  status: Boolean,
  email_otp: Number,
  mobile_otp: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 
const User = mongoose.model('users', usersSchema);
module.exports = User;