// models/Fund.js
import mongoose from 'mongoose';
import { type } from 'os';

const FundSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  fundamount:{
    type: Number,
    required:true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Fund', FundSchema); 