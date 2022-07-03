import { PrismaClient, User } from "@prisma/client";

import { passwordHash } from '../utils/auth'

class UsersController {
  async save(user: User) {
    const prisma = new PrismaClient()

    const encryptedPassword = await passwordHash(user.password)

    try {
      user.password = encryptedPassword
      return await prisma.user.create({
        data: user
      })
    } catch (e) {
      throw e
    } finally {
      await prisma.$disconnect()
    }
  }

  async getUsersByEmail(email: string) {
    const prisma = new PrismaClient()
    try {
      return await prisma.user.findUnique({
        where: {
          email: email
        }
      })
    } catch (e) {
      throw e
    } finally {
      prisma.$disconnect()
    }
  }
}

export default new UsersController()
