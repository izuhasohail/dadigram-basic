import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {

    try {
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "dadigram_basic",
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }).then((mongoose) => {
            return mongoose;
          });
          console.log("Connected to MongoDB");
        
    } catch (error) {

        console.log(error)
        
    }
    
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
