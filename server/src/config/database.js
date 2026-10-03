import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

export async function connectDatabase() {
  if (!env.MONGODB_URI) {
    console.log('[Database] MONGODB_URI not configured. Operating with local file storage in server/data/enquiries.json.');
    return false;
  }

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('[Database] Connected successfully to MongoDB.');
    return true;
  } catch (error) {
    console.warn(`[Database] MongoDB connection failed (${error.message}). Falling back to local file storage.`);
    isConnected = false;
    return false;
  }
}

export function isDatabaseConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
