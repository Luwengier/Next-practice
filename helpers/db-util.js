import { MongoClient } from 'mongodb'

export const connectDatabase = async () => {
  const uri = process.env.DATA_URI
  const client = new MongoClient(uri)
  await client.connect()

  return client
}

export const insertDocument = async (client, collection, document) => {
  const database = client.db('events')
  const result = await database
    .collection(collection)
    .insertOne(document)

  return result
}

export const getAllDocuments = async (client, collection, sort, filter) => {
  const database = client.db('events')

  const documents = await database
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray()

  return documents
}