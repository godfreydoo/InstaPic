import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({
  username: { type: String, required: true },
  password: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);