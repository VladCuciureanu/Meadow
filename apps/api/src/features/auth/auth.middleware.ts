import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./auth.interfaces";
import usersService from "../users/users.service";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token ?? req.headers.authorization;
  try {
    if (token) {
      const data = jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET!
      );
      const userId = (data as any).userId as string;
      usersService.getById(userId).then((user) => {
        if (user !== null) {
          (req as AuthenticatedRequest).user = user;
          next();
        } else {
          res.sendStatus(403);
        }
      });
    }
  } catch {
    res.sendStatus(403);
  }
};
