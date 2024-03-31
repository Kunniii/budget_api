import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: Function) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    jwt.verify(req.headers.authorization.split(" ")[1], "", function (err, decode) {
      next();
    });
  } else {
    res.status(401).json({ OK: false, message: "Unauthorized" });
  }
}
