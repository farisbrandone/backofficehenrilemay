import nodemailer from "nodemailer";

export async function sendEmailForInitializePassword(
  code: string,
  email: string
) {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "farisbrandone0@gmail.com",
        pass: process.env.APP_PASSWORD,
      },
    });
    const photos =
      "https://firebasestorage.googleapis.com/v0/b/carte-interactive-e3ecd.appspot.com/o/IMG-20250106-WA0002.jpg?alt=media&token=83983d07-8f7e-4978-a449-840c178d0863";

    var mailoutput = `
      <!DOCTYPE html>
<html>
<head>
  <title>Centered HTML Email</title>
  <style>
    .container {
      width: 100%;
    }
    .content {
      margin: auto auto;
    }
    .text-content1 {
      margin: 0 auto;
      text-align: center;
    }
    .a-content1 {
      display: block;
      width: 120px;
      margin: 0 auto;
      border-radius: 5px;
      font-weight: 900;
      background-color: #302f2f;
      color: white;
      padding: 10px;
      text-align: center;
      font-size: 16px;
      margin-bottom: 40px;
      margin-top: 20px;
    }
    .img-content {
      margin: 0 auto;
      display: block;
      width: 240px;
      height: 75px;
      background-color: transparent;
      margin-bottom: 30px;
      margin-top: 30px;
    }
    .child4 {
      width: 100%;
      text-align: center;
    }
    .text-child4 {
      color: rgb(53, 81, 240);
      margin-left: 5px;
    }
    .text-textfinal {
      margin-top: 2px;
      margin-left: -250px;
    }
    .fil {
      display: block;
      margin-left: -130px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="img-content">
        <img
          src="${photos}"
          alt="ICON"
          class="img-content"
          width="180px"
          height="75px"
        />
      </div>
      <p class="text-content1">
        lien de redirection pour l'initialisation de votre mot de passe
      </p>
      <a
        class="a-content1"
        href="https://olivier-carte.vercel.app/redirection-mot-de-passe?code=${code}&email=${email}"
      >
        Cliquez ici</a
      >
      <div class="child4">
        <p class="text-textfinal">
          <span class="fil">Merci</span>
          L'équipe
          <span class="text-child4"><strong>HENRI LEMAY</strong> </span>
        </p>
      </div>
    </div>
  </div>
</body>
</html>

        `;
    var objetMail = `Mail d'initialisation du mot de passe`;
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
