import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
   logger.error({
    message: err.message,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
};