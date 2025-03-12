import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prismaClient";

interface AuthRequest extends Request {
  user?: { id: string; email: string; role?: string };
}

export async function verifyAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Ensure the user is authenticated
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    // Retrieve the user from the database
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if the user has admin privileges
    if (user.role !== "admin") {
      res.status(403).json({ message: "Forbidden: Admins only" });
      return;
    }

    next(); // User is an admin; proceed to the next middleware/controller
  } catch (error) {
    res.status(500).json({ message: "Error verifying admin role", error });
  }
}
