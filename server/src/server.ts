import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import BaseRouter from './routes/v1/Base'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/v1', BaseRouter)

const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server running  ${port}`)
})
