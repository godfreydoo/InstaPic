import mongoose from 'mongoose';

let uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null};
}

export const connectToDatabase = async function () {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(mongoose => {
        return mongoose;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
