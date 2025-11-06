import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export function validateBody(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = formatZodErrors(result.error);
      return next(
        new ApiError(400, "Erro de validação nos campos", formattedErrors)
      );
    }
    req.body = result.data;
    next();
  };
}

function formatZodErrors(error: ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    // Pega o caminho do campo (ex: ['message']) e gera "message"
    const path = issue.path.join(".") || "root";
    errors[path] = issue.message;
  }
  return errors;
}
