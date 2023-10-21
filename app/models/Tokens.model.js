
const winston = require('../utils/Winston');
const {express, db} = require('../utils/RequiredPackages');
const conn = db.dbConn();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 7); // Defualt Token Expiry : 7 days 

const tokensSchema = new Schema({
  user_id: { type : String, required : true },
  token: String,
  key: String,
  value: String,
  os: String,
  type: {
    type: String,
    required : true ,
    default: "user",
    comment: "User Type: admin (Admin of Login User (Parent of Users)), super-admin (Admin for backend only), vendor, api, client, customer, public, otp"
  },
  willExpire: {
    type: Boolean,
    default: true,
    comment: "If false, token will never expire."
  },
  isExpired: {
    type: Boolean,
    default: false,
    comment: "If token is expired, it will be true else false."
  },
  expireAt: {
    type: Date,
    default: expiryDate,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
 
module.exports = mongoose.model("tokens", tokensSchema);