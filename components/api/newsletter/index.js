import fs from 'fs'
import path from 'path'

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email

    const newEmail = {
      id: new Date().getTime().toString(),
      email: email,
    }

    const filePath = path.join(process.cwd(), 'data', 'newsLetter.json')
    const filedData = fs.readFileSync(filePath)
    const data = JSON.parse(filedData)

    data.push(newEmail)
    fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!', email: newEmail })
  } else {
    const filePath = path.join(process.cwd(), 'data', 'newsLetter.json')
    const filedData = fs.readFileSync(filePath)
    const data = JSON.parse(filedData)

    res.status(200).json({ feedback: data })
  }
}

export default handler