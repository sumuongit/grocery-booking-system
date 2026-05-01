import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

export const mockAuth = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roleHeader = req.headers["x-role"];

    if (!roleHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (roleHeader !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};