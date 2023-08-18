import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./auth.interfaces";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    (req as AuthenticatedRequest).user = { id: (data as any).userId };
    return next();
  } catch {
    return res.sendStatus(403);
  }
};
