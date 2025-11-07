import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details || undefined,
    });
  }

  console.error("Erro inesperado:", err);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor",
  });
}
