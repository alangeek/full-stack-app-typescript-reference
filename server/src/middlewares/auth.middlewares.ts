import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization || ""

    const [_, token] = authHeader.split(" ")
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    (req as any).authUserId = (decodedToken as any).id
    next()
  } catch (e) {
    res.status(401).json({ message: "Usuário não autorizado. [ex]" })
  }
}
