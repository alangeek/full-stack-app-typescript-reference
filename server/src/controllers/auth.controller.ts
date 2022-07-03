import { User } from "@prisma/client";

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
        return user
      }

    }
    return undefined

  }
}

export default new AuthController()
