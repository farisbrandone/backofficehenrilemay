import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import { sendEmailForInitializePassword } from "../tools/emailInitializePassword";
import { generateTokens } from "../services/tokenService";

// Service pour envoyer un email de redirection
export async function sendPasswordResetEmail(
  req: Request,
  res: Response
): Promise<void> {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const code = jwt.sign(
      {
        userEmail: email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.SECRET_KEY as string
    );

    await sendEmailForInitializePassword(code, email);
    res.status(201).json({ message: "Email send" });
  } catch (error) {
    res.status(404).json({ message: "User not found" });
    return;
  }
}

// Reset Password Controller
export async function resetPassword(
  req: Request,
  res: Response
): Promise<void> {
  const { password, code, email } = req.body;
  try {
    const token = code;
    let decode: any;
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log(err);
          throw new Error("La connection à échouer");
        } else {
          decode = decoded;
        }
      }
    );

    if (email !== decode.userEmail) {
      throw new Error("La connection à échouer");
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const data = { password };
    const userUpdate = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });

    const tokens = generateTokens({
      id: userUpdate.id,
      email: userUpdate.email,
    });
    res.status(201).json({ user: userUpdate, tokens });
  } catch (error) {
    res.status(500).json({ message: "Error during password reset", error });
  }
}
