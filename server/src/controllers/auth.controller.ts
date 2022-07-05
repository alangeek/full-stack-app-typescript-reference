import { User } from "@prisma/client";
import * as jwt from 'jsonwebtoken'

import { checkPassword } from './../utils/auth';
import usersControllers from "./users.controllers";

class AuthController {
  async signUp(user: User) {
    return await usersControllers.save(user)
  }

  async signIn(email: string, password: string) {
    const user = await usersControllers.getUsersByEmail(email)
    if (user) {

      if (await checkPassword(password, user.password)) {
        const token = jwt.sign({
          id: user.id
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
        return token
      }

    }
    return undefined

  }
}

export default new AuthController()
