import express, { Request, Response } from 'express'

import UsersRouter from './users'
import AuthRouter from './auth'
import { authMiddleware } from '../../middlewares/auth.middlewares'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send('OK')
})

router.use(AuthRouter)
router.use(authMiddleware)
router.use(UsersRouter)

export default router
