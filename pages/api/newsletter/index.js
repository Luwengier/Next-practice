import fs from 'fs'
import path from 'path'

export const buildNewsLetterPath = () => {
  return path.join(process.cwd(), 'data', 'newsLetter.json')
}

export const extractNewsLetter = (filePath) => {
  const filedData = fs.readFileSync(filePath)
  const data = JSON.parse(filedData)
  return data
}

const handler = (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' })
      return
    }

    console.log(email)

    // const newEmail = {
    //   id: new Date().getTime().toString(),
    //   email: email,
    // }

    // const filePath = path.join(process.cwd(), 'data', 'newsLetter.json')
    // const filedData = fs.readFileSync(filePath)
    // const data = JSON.parse(filedData)

    // data.push(newEmail)
    // fs.writeFileSync(filePath, JSON.stringify(data))
    res.status(201).json({ message: 'Success!' })
  } else {
    const filePath = buildNewsLetterPath()
    const data = extractNewsLetter(filePath)

    res.status(200).json({ newsLetter: data })
  }
}

export default handler