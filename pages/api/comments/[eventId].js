import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  const eventId = req.query.eventId

  const uri = 'mongodb+srv://mdb21788:mdb21520@cluster0.qj6q2.mongodb.net/?retryWrites=true&w=majority'
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
      .find()
      .sort({ _id: -1 })
      .toArray()

    res.status(200).json({ comments: documents })
  }

  await client.close()
}

export default handler