import nodemailer from "nodemailer";
import { baseUrl } from "./emailInitializePassword";

export async function emailSignup(
  code: string,
  email: string,
  password: string
) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farisbrandone0@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });

    var mailoutput = `
         <!DOCTYPE html>
    <html>
      <head>
        <title></title>
        <style>
          .container {
            width: 100%;
          }
          .content {
            max-width: 500px;
            font-size: 18px;
            position: relative;
            margin: auto auto;
          }
          .text-child1 {
            display: block;
            text-align: center;
            margin: 0 auto;
    
            margin-top: 20px;
            margin-bottom: 20px;
          }
          .child2 {
            margin: 0 auto;
            width: 100%;
            margin-bottom: 30px;
          }
          .text-child2 {
            text-align: center;
          }
          .a-child2 {
            display: block;
            margin: 0 auto;
            width: 150px;
            border-radius: 5px;
            font-weight: 900;
            background-color: #302f2f;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            align-self: center;
          }
          .child3 {
            width: 100%;
            display: block;
            font-size: 14px;
            gap: 5px;
            margin-bottom: 30px;
          }
          .text-child3 {
            display: block;
            text-align: center;
          }
          .child4 {
            width: 100%;
            margin: 0 auto;
    
            font-size: 16px;
          }
          .text-child4 {
            color: rgb(53, 81, 240);
            margin-left: 5px;
          }
          .text-textfinal {
            margin-top: -2px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <p class="text-child1">
              <span>Merci de vous être inscrit sur</span>
              <span><strong> la carte interactive</strong></span>
            </p>
    
            <div class="child2">
              <p class="text-child2">
                Pour activer votre compte, veuillez cliquer sur le lien ci-dessous
                pour confirmer votre adresse email:
              </p>
    
              <a
                class="a-child2"
                href="${baseUrl}/carte/redirection-activation-compte?code=${code}&emailActivate=${email}&passwordActivate=${password}"
              >
                Activez votre compte</a
              >
            </div>
            <div class="child3">
              <p class="text-child3">
                En cas de problème veuillez <span>nous contactez</span>
              </p>
            </div>
            <div class="child4">
              <span>Merci</span>
              <p class="text-textfinal">
                L'équipe
                <span class="text-child4"><strong>HENRI LEMAY</strong> </span>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
          `;
    var objetMail = `Veillez activer votre compte`;
    var mailOptions = {
      from: "farisbrandone0@gmail.com",
      to: email,
      subject: objetMail,
      html: mailoutput,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw new Error("Votre email semble ne pas éxister");
      } else {
      }
    });
  } catch (error) {
    throw new Error("Votre email semble ne pas éxister");
  }
}
