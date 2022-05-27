import { MongoClient } from 'mongodb'


const connectDatabase = async () => {
  const uri = process.env.DATA_URI
  const client = new MongoClient(uri)
  await client.connect()

  return client
}

const insertDocument = async (client, document) => {
  const database = client.db('events')
  await database.collection('newsletter').insertOne(document)
}

const handler = async (req, res) => {

  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    let client

    try {
      client = await connectDatabase()
    } catch (error) {
      res.status(500).json({ message: 'Connect to the database failed!' })
      return
    }

    try {
      await insertDocument(client, { email: email })
      await client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return
    }

    res.status(201).json({ message: 'Success!' })

  }
}

export default handler