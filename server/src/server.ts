import 'dotenv/config'
import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('OK')
})

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server running  ${port}`)
})