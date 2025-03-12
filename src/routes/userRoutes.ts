import express from "express";
import {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  sendContactMessage,
} from "../controllers/userController";
import { verifyAdmin } from "../middleware/verifiedAdmin";

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.post("/send-contact-message", sendContactMessage);

router.delete("/:id", verifyAdmin, deleteUser);

export default router;
