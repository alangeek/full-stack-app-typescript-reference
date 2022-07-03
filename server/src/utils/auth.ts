import bcrypt from 'bcryptjs'

export const passwordHash = async (password: string) => {
  return bcrypt.hash(password, 8)
}

export const checkPassword = (password: string, passHash: string) => {
  return bcrypt.compare(password, passHash)
}
