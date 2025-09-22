const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL)

const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    godname: { type: String, default: 'Radha Radha ' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyotp: { type: String, default: '' },
    verifyotpexpireat: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: null },
    dailyCounts: { type: Map, of: Number, default: {} },
    count: { type: Number, default: 0 },
    resetotp: { type: String, default: '' },
    resetotpexpireat: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model("user", userschema)
