import fs from 'fs'
import path from 'path'

export const buildCommentPath = () => {
  return path.join(process.cwd(), 'data', 'comment.json')
}

export const extractComment = (filePath) => {
  const fileData = fs.readFileSync(filePath)
  const data = JSON.parse(fileData)
  return data
}

const handler = (req, res) => {
  const filePath = buildCommentPath()
  const data = extractComment(filePath)

  res.status(200).json({ comment: data })
}

export default handler