import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({
  idx: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true},
  dateCreated: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);