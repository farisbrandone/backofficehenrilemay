import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../prisma/prismaClient";
import { generateTokens } from "../services/tokenService";

// Controller: Reset Password and Authenticate
export async function resetPasswordAndAuthenticate(
  req: Request,
  res: Response
): Promise<void> {
  const { resetToken, newPassword } = req.body;

  try {
    // Verify the reset token
    const decoded = jwt.verify(
      resetToken,
      process.env.RESET_TOKEN_SECRET as string
    ) as JwtPayload;

    // Find the user using the decoded token data (e.g., user ID)
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(404).json({ message: "Invalid token or user not found" });
      return;
    }

    // Hash the new password
    //const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    //user.password = hashedPassword;
    const data = { password: newPassword };
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });

    // Generate fresh tokens for the user (access and refresh tokens)
    const tokens = generateTokens(user);

    res.status(200).json({
      message: "Password updated successfully",
      tokens,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid or expired reset token" });
    } else {
      res.status(500).json({ message: "Error resetting password", error });
    }
  }
}
