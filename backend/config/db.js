const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_generator';

  try {
    // Attempt connecting to the configured URI with a short server selection timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`[Database] Successfully connected to Primary MongoDB: ${mongoose.connection.host}`);
  } catch (primaryErr) {
    console.warn(`[Database] Primary MongoDB connection failed (${uri}): ${primaryErr.message}`);
    console.log('[Database] Initializing persistent local MongoDB storage for zero-config operation...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const dbDir = path.join(__dirname, '..', 'data', 'db');
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      // Check for stale lock file from ungraceful shutdown
      const lockFile = path.join(dbDir, 'mongod.lock');
      if (fs.existsSync(lockFile)) {
        try {
          const lockContent = fs.readFileSync(lockFile, 'utf8').trim();
          if (!lockContent) {
            fs.unlinkSync(lockFile);
          }
        } catch (_) {}
      }

      try {
        mongodInstance = await MongoMemoryServer.create({
          instance: {
            dbPath: dbDir,
            dbName: 'portfolio_generator'
          }
        });
      } catch (pathErr) {
        // If file lock issue with existing dbPath, fallback to fresh memory instance
        console.warn(`[Database] Could not attach to existing dbPath (${pathErr.message}), starting clean memory instance...`);
        mongodInstance = await MongoMemoryServer.create({
          instance: {
            dbName: 'portfolio_generator'
          }
        });
      }

      const memoryUri = mongodInstance.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to Local Persistent MongoDB at: ${memoryUri}`);
    } catch (memErr) {
      console.error(`[Database] Failed to start local MongoDB: ${memErr.message}`);
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
