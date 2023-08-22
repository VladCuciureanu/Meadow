import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { MeadowError } from "../interfaces/error";

export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ message: e.message, path: e.path }));
      }
      return res.status(400).json({
        status: "Failed payload validations.",
        errors: err,
      } as MeadowError);
    }
  };
