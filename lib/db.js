import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { User, Post } from '../util/schema';
import { connectToDatabase } from '../util/mongodb';

export const createUser = async (req, { username, password }) => {
  try {
    await connectToDatabase();
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    const newUser = new User({
      idx: uuidv4(),
      username: username,
      password: hash,
      salt: salt,
    });

    const res = await newUser.save();
    return res;
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/db.js createUser');
  }
};

export const findUserByUsername = async (req, username) => {
  try {
    await connectToDatabase();
    const res = await User.find({username});
    return res[0];
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/db.js findUserByUsername');
  }
};

export const validatePassword = (user, inputPassword) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex');
  const isMatch = user.password === inputHash;
  return isMatch;
};

export const savePost = async (data) => {
  try {
    await connectToDatabase();
    const newPost = new Post(data);
    const res = await newPost.save();
    return res;
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/db.js savePost');
  }
};

export const getPosts = async (username = undefined, page = 1, count = 8) => {

  let filter = {};
  if (username) {
    filter.username = username;
  }
  let skip = (Number(page) - 1) * 8;

  try {
    await connectToDatabase();
    const res = await Post.find(filter).sort({ dateCreated: -1 }).skip(skip).limit(8);
    return res;
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/db.js getPosts');
  }
};

export const getTotalPosts = async () => {
  try {
    await connectToDatabase();
    const res = await Post.countDocuments();
    return res;
  } catch (err) {
    console.log(err);
    console.log('Something went wrong in lib/db.js getTotalPosts');
  }
};