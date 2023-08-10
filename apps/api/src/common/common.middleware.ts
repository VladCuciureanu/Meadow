import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, ZodOptional } from "zod";

export interface MeadowError {
  status: string;
  errors: any[];
}

export const validate =
  (schema: AnyZodObject | ZodOptional<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        err = err.issues.map((e) => ({ message: e.message, path: e.path }));
      }
      return res.status(400).json({
        status: "Failed payload validations.",
        errors: err,
      } as MeadowError);
    }
  };
