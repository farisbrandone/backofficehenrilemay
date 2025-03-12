import { Request, Response } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../services/userService";
import nodemailer from "nodemailer";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newUser = await createUser(data);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extracting the id from request parameters
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params; // Extract id from request parameters
    const data = req.body; // Extract data to update from request body
    const userValue = req.user;

    const updatedUser = await updateUserById(id, data, userValue);

    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract id from request parameters
    const deletedUser = await deleteUserById(id);

    res.status(200).json(deletedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export async function sendContactMessage(req: any, res: any) {
  const { message, senderEmail, receiverEmail, senderPrenom, receiverPrenom } =
    req.body;

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farisbrandone0@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });

    var mailoutput = `
      <p>Voici le message de ${senderPrenom} :</p>
      <br />
       <p> ${message} </p>
      <br />
      <p>Vous pouvez répondre à ${senderPrenom} sur son adresse mail personnelle : <span style="color: rgb(22, 99, 243); text-decoration: underline;">${senderEmail} </span></p>
    `;
    var objetMail = `Message de ${senderPrenom} `;
    var mailOptions = {
      from: "farisbrandone0@gmail.com",
      to: receiverEmail,
      subject: objetMail,
      html: mailoutput,
    };

    const sendEmail = await transporter.sendMail(
      mailOptions /* function (error, info) {
      if (error) {
        console.log(error);
        throw new Error("Votre email semble ne pas éxister");
      } else {
        console.log("mamou");
      }
    } */
    );

    const result = {
      success: "Opération effectuée avec success",
      error: "not error",
      alreadyExist: false,
    };

    res.status(201).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}
