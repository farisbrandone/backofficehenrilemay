import { Request, Response } from "express";
//import bcrypt from 'bcryptjs';

import prisma from "../prisma/prismaClient";
import { generateTokens } from "../services/tokenService";
import { emailSignup } from "../tools/emailSignup";
import jwt from "jsonwebtoken";
import { emailValidation } from "../tools/emailValidation";
// Inscription
export async function signup(req: Request, res: Response): Promise<void> {
  const data = req.body;
  try {
    //const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
      res.status(202).json(user);
      return;
    }

    //const tokens = generateTokens({ id: newUser.id, email: newUser.email });
    const code = jwt.sign(
      {
        userPassword: req.body.password,
        userEmail: req.body.email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.SECRET_KEY as string
    );
    await emailSignup(code, data.email, data.password);
    const newUser = await prisma.user.create({ data });
    res.status(201).json({ message: "User created", code });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error });
  }
}

// Connexion
export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const tokens = generateTokens({ id: user.id, email: user.email });
    res.status(201).json({ user, tokens });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
}
//export const baseUrl = "https://backofficehenrilemay.onrender.com";
// Connexion
export async function adminLogin(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  console.log({ email, password });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (
      email === "carteinteractive@email.com" &&
      password === "123abc@" &&
      !user
    ) {
      const data: any = {
        email,
        password,
        ville: "",
        image: "",
        prenom: "",
        nom: "",
        genre: "",
        description: "",
        pays: "",
        seeLastConnexion: true,
        maskProfil: false,
        activeCompte: 0,
        uid: "",
        role: "admin",
      };

      const usercreate = await prisma.user.create({
        data,
      });
      const tokens = generateTokens({
        id: usercreate.id,
        email: usercreate.email,
      });

      res.status(201).json({ message: "Login successful", tokens });
      return;
    }

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    //const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user.role === "admin") {
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      console.log("toutou");
      const tokens = generateTokens({ id: user.id, email: user.email });
      res.status(201).json({ message: "Login successful", tokens });
      return;
    }

    res.status(401).json({ message: "Non authorisé" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error during login", error });
  }
}

export async function adminReset(req: Request, res: Response): Promise<void> {
  const { email, password, newEmail, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const data = { email: newEmail, password: newPassword };

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });
    res.status(201).json({ message: "Change successful" });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
}

export async function activationCompte(
  req: Request,
  res: Response
): Promise<void> {
  const { emailActivate, code } = req.body;
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

    if (emailActivate !== decode?.userEmail) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: { email: emailActivate },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const data = { activeCompte: 1 };

    const userUpdate = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: data,
    });

    const tokens = generateTokens({ id: user.id, email: user.email });
    res.status(201).json({ user: userUpdate, tokens });
  } catch (error) {
    res.status(500).json({ message: "User not found" });
    return;
  }
}

export async function emailDeValidation(req: Request, res: Response) {
  const email = req.body.email;

  try {
    await emailValidation(email);
    res.status(201).json({ message: "Email envoyé avec success" });
  } catch (error) {
    res.status(202).json({ message: "Server error" });
  }
}
