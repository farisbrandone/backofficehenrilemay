import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function verifyAccessToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access token is required" });
    return;
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        res.status(202).json({ message: "Invalid or expired token" });
        return;
      }
      req.user = decoded as JwtPayload;
      next();
    }
  );
}
