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

export function validateQuery(schema: ZodSchema<any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join(".") || "query";
        errors[path] = issue.message;
      }
      return next(
        new ApiError(
          400,
          "Erro de validação nos parâmetros de consulta",
          errors
        )
      );
    }

    // ✅ Corrigido: não sobrescreve o getter
    Object.assign(req.query, result.data);
    next();
  };
}
