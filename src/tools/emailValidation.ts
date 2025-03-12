import nodemailer from "nodemailer";

export async function emailValidation(email: string) {
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
          max-width: 500px;
          font-size: 16px;
          padding: 20px;
          margin: auto auto;
          gap: 20px;
        }
        .img-content {
          display: block;
          margin: auto;
          width: 240px;
          height: 75px;
          object-fit: cover;
          background-color: transparent;
          margin-bottom: 30px;
        }
        .text-content1 {
          display: block;
          width: 100%;
          margin-bottom: 15px;
          margin: 0 auto;
          margin-bottom: 10px;
          text-align: center;
        }
        .child-content1 {
          width: 100%;
          margin: 0 auto;
          margin-bottom: 10px;
          text-align: center;
        }
        .a-content1 {
          display: block;
          margin: 0 auto;
          width: 180px;
          border-radius: 5px;
          font-weight: 900;
          background-color: #302f2f;
          color: white;
          padding: 10px;
          text-align: center;
          font-size: 14px;
        }
        .child-content2 {
          display: block;
          font-size: 14px;
          text-align: center;
          margin-bottom: 20px;
        }
        .span-text {
          color: orange;
        }
        .child-content4 {
          width: 100%;
        }
        .span-child-content4 {
          color: rgb(53, 81, 240);
        }
        .dd {
          display: block;
          text-align: center;
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
  
          <div class="text-content1">
            <p>Merci de vous être inscrit sur</p>
            <p><strong> la carte interactive de HENRI LEMAY</strong></p>
          </div>
  
          <div class="child-content1">
            <p>Votre compte est maintenant actif</p>
  
            <a class="a-content1" href="https://olivier-carte.vercel.app">
              Connectez-vous à notre site</a
            >
          </div>
          <div class="child-content2">
            <p class="dd">
              En cas de problème veuillez
              <span class="span-text">nous contactez</span>
            </p>
          </div>
          <div class="child-content4">
            <span>Merci</span>
            <p>
              L'équipe
              <span class="span-child-content4"
                ><strong>HENRI LEMAY</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    </body>
  </html>
  
  
        `;
    var objetMail = `Bienvenue sur carte HENRI LEMAY`;
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

    return {
      success: "Opération effectuée avec success",
      error: "not error",
      resultState: true,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
