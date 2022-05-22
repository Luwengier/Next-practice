// import { buildCommentPath, extractComment } from '.'

const handler = (req, res) => {
  // const eventId = req.query.eventId
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
      id: new Date().toISOString(),
      email,
      name,
      text,
    }

    console.log(newComment)
    res.status(201).json({ message: 'Added comment.', comment: newComment })

  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'c1', name: 'Max', text: 'A first comment!' },
      { id: 'c2', name: 'Manuel', text: 'A second comment!' }
    ]

    res.status(200).json({ comments: dummyList })
    // const filePath = buildCommentPath()
    // const commentsData = extractComment(filePath)
    // const selectedComments = commentsData.filter(comment => comment.eventId === eventId)
    // res.status(200).json({ comments: selectedComments })
  }
}

export default handler