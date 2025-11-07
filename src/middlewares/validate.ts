import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export function validate(schemas: {
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
  params?: ZodSchema<any>;
}) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // valida body, query e params (se existirem)
      for (const [key, schema] of Object.entries(schemas)) {
        if (!schema) continue;

        const result = schema.safeParse((req as any)[key]);

        if (!result.success) {
          const formatted = formatZodErrors(result.error);
          throw new ApiError(400, "Erro de validação", formatted);
        }

        Object.assign((req as any)[key], result.data);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}

/**
 * Formata erros do Zod em um objeto mais simples
 *
 */
function formatZodErrors(error: ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".") || "root";
    errors[path] = issue.message;
  }
  return errors;
}
