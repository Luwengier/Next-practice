import { MongoClient } from 'mongodb'


const handler = async (req, res) => {

  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    const uri = process.env.DATA_URI
    const client = new MongoClient(uri)
    try {
      await client.connect()
      const database = client.db('events')
      await database.collection('newsletter').insertOne({ email: email })

      res.status(201).json({ message: 'Success!' })
    } finally {
      await client.close()
    }

  }
}

export default handler