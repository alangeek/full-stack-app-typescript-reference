import { User } from '@prisma/client'
import express, { Request, Response } from 'express'
import usersControllers from '../../../controllers/user.controllers'

const router = express.Router()

router.get('/users/me', async (req: Request, res: Response) => {
  const id = (req as any).authUserId
  try {
    const user = await usersControllers.find(id)
    return res.status(200).json({ user })
  } catch (e) {
    return res.status(500).json({ message: 'Não foi possível obter os dados do usuário.' })
  }
})


export default router
