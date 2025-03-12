import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateTokens } from "../services/tokenService";
import prisma from "../prisma/prismaClient";

// Refresh Token Controller
export async function refreshToken(req: Request, res: Response): Promise<void> {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({ message: "Refresh token is required" });
    return;
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as jwt.JwtPayload;

    // Find the user from the decoded token payload
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Generate a new access token (and optionally a new refresh token)
    const tokens = generateTokens({ id: user.id, email: user.email });

    res.status(200).json({
      user,
      tokens,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid or expired refresh token" });
    } else {
      res.status(500).json({ message: "Error refreshing tokens", error });
    }
  }
}
