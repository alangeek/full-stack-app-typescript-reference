import { User } from '@prisma/client'
import express, { Request, Response } from 'express'

import authController from '../../../controllers/auth.controller'
import usersControllers from '../../../controllers/users.controllers'

const router = express.Router()

router.post('/sign-in', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await authController.signIn(email, password)
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(500).json({ message: "Usuário ou senha inválidos. [1]" })
    }
  } catch (e) {
    return res.status(500).json({ message: "Usuário ou senha inválidos. [2]" })
  }
})

router.post('/sign-up', async (req: Request, res: Response) => {
  let user: User = req.body
  // Salvar
  try {
    user = await usersControllers.save(user)
    return res.status(201).json(user)
  } catch (e) {
    return res.status(500).json({ message: "Não foi possivel criaar o usuário" })
  }
})

export default router