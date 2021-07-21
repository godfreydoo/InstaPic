import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../util/schema';
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

    await newUser.save();
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

