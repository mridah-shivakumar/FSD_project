const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_generator';

  try {
    // Attempt connecting to the configured URI with a short server selection timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[Database] Successfully connected to MongoDB: ${mongoose.connection.host}`);
  } catch (primaryErr) {
    console.warn(`[Database] Could not connect to primary MongoDB URI (${uri}): ${primaryErr.message}`);
    console.log('[Database] Starting in-memory MongoDB server for zero-configuration development...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();
      
      await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to in-memory MongoDB at: ${memoryUri}`);
    } catch (memErr) {
      console.error(`[Database] Failed to start in-memory MongoDB: ${memErr.message}`);
      throw memErr;
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};

module.exports = { connectDB, disconnectDB };
