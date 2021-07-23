import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema ({
  idx: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true},
  dateCreated: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema ({
  username: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

/*
*  Posts: indexed createdAt by desc, and created composite index for username + _id for filtering posts by user
*  Users: indexed by username
*/