import express, { Request, Response } from "express";
import userRoutes from "./src/routes/userRoutes";
import authenticateRoutes from "./src/routes/authenticateRoutes";
import cors from "cors";
import { verifyAccessToken } from "./src/middleware/authentication";
import {
  serveBackoffice,
  serveFrontend,
} from "./src/controllers/frontendCarteController";
import path from "path";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  "/backoffice",
  express.static(path.join(__dirname, "backoffice", "dist"))
);
app.get("/backoffice/*", (req: Request, res: Response) => {
  console.log("bobo");
  res.sendFile(path.join(__dirname, "backoffice", "dist", "index.html"));
});
app.use("/users", verifyAccessToken, userRoutes);
app.use("/authenticate", authenticateRoutes);

app.use("/carte", express.static(path.join(__dirname, "carte", "dist")));
app.get("/carte/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "carte", "dist", "index.html"));
  console.log("koukou");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
