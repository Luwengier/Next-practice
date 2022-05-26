import { MongoClient } from 'mongodb'


const handler = async (req, res) => {

  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    const uri = 'mongodb+srv://mdb21788:mdb21520@cluster0.qj6q2.mongodb.net/?retryWrites=true&w=majority'
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