import { connectDatabase, insertDocument } from '../../../helpers/db-util'


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
      await insertDocument(client, 'newsletter', { email: email })
      await client.close()
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed!' })
      return
    }

    res.status(201).json({ message: 'Success!' })

  }
}

export default handler