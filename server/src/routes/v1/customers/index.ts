import { Customer } from '@prisma/client'
import express, { Request, Response } from 'express'

import customerController from '../../../controllers/customer.controller'

const router = express.Router()

router.get('/customers', async (req: Request, res: Response) => {
  const id = (req as any).authUserId
  try {
    const customers = await customerController.fetch(id)
    return res.status(200).json({ customers })
  } catch (e) {
    return res.status(500).json({ message: 'Não foi possível obter os clientes.' })
  }
})

async function saveCustomer(req: Request, res: Response) {
  const id = (req as any).authUserId
  let customer: Customer = req.body
  customer.userId = id
  const status = customer.id > 0 ? 200 : 201
  const errorMessage = customer.id > 0 ? 'atualizar' : 'cadastrar'
  try {
    customer = await customerController.save(id, customer)
    return res.status(status).json({ customer })
  } catch (e) {
    return res.status(500).json({ message: `Não foi possível ${errorMessage} cliente.` })
  }
}

router.post('/customers', async (req: Request, res: Response) => {
  await saveCustomer(req, res)
})

router.put('/customers', async (req: Request, res: Response) => {
  await saveCustomer(req, res)
})

export default router
