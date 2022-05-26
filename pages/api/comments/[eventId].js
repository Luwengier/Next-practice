import { MongoClient } from 'mongodb'
import 'dotenv/config'

const handler = async (req, res) => {
  const eventId = req.query.eventId
  console.log(process.env)

  const uri = process.env.DATA_URI
  const client = new MongoClient(uri)
  await client.connect()
  const database = client.db('events')

  if (req.method === 'POST') {
    const { email, name, text } = req.body

    if (
      !email.includes('@')
      || !name
      || name.trim() === ''
      || !text
      || text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    }

    const result = await database.collection('comments').insertOne(newComment)

    newComment.id = result.insertedId

    console.log(result)
    res.status(201).json({ message: 'Added comment.', comment: newComment })

  }

  if (req.method === 'GET') {
    const documents = await database.collection('comments')
      .find({ eventId: eventId })
      .sort({ _id: -1 })
      .toArray()

    res.status(200).json({ comments: documents })
  }

  await client.close()
}

export default handler