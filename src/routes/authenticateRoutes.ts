import express from "express";

import {
  activationCompte,
  adminLogin,
  adminReset,
  emailDeValidation,
  login,
  signup,
} from "../controllers/loginSignupController";
import {
  resetPassword,
  sendPasswordResetEmail,
} from "../controllers/forgetPasswordController";
import { verifyAccessToken } from "../middleware/authentication";
import { resetPasswordAndAuthenticate } from "../controllers/resetPasswordController";
import { refreshToken } from "../controllers/refreshTokenController";
import prisma from "../prisma/prismaClient";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/activation-compte", activationCompte);
router.post("/email-validation", emailDeValidation);
router.post("/adminlogin", adminLogin);
router.post("/adminreset", adminReset);
router.post("/initialisation-password", resetPassword);
router.post("/initialisation-email", sendPasswordResetEmail);
router.post("/refresh-token", refreshToken);
router.post("/reset-password-authenticate", resetPasswordAndAuthenticate);
router.get("/protecteds", verifyAccessToken, async (req: any, res) => {
  const userResearch = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });
  res.status(200).json({ user: userResearch });
});

export default router;
