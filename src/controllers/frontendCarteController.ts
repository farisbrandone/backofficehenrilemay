import { Request, Response } from "express";
import path from "path";

export const serveFrontend = (req: Request, res: Response) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "/", "carte", "index.html"));
  console.log("koukou");
  res.end();
};

export const serveBackoffice = (req: Request, res: Response) => {
  console.log("bobo");
  res.sendFile(path.join(__dirname, "/", "backoffice", "index.html"));
  res.end();
};
