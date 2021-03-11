import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

export async function connect() {
  const uri = await mongod.getUri()
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  }

  await mongoose.connect(uri, mongooseOpts)
}

export async function disconnect() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

export async function clearDatabase() {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.drop()
  }
}
