import express, { Request, Response } from 'express'

import UsersRouter from './users'
import AuthRouter from './auth'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('OK')
})

router.use(UsersRouter)
router.use(AuthRouter)

export default router
