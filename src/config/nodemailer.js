import nodemailer from "nodemailer";
import envs from "./envs.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: envs.gmail_user,
    pass: envs.gmail_pass,
  },
});

transporter.verify((error, success) => {
  if (error) console.log("ERROR SMTP:", error);
  else console.log("SMTP listo");
});

const sendRecoveryEmail = async (email, token) => {
  const link = `${envs.base_url}/api/sessions/reset-password/${token}`;

  const mailOptions = {
    from: `"No-Reply" <${envs.gmail_user}>`,
    to: email,
    subject: "Restablecer contraseña",
    html: `
      <h2>Restablecer contraseña</h2>
      <p>Hacé click en el botón para cambiar tu contraseña (expira en 1 hora):</p>
      <a href="${link}"
         style="
         display:inline-block;
         padding:10px 20px;
         background:#4CAF50;
         color:white;
         text-decoration:none;
         border-radius:5px;
      ">Restablecer contraseña</a>
      <p>Si no solicitaste este cambio, podés ignorar el correo.</p>
    `,
  };

  return transporter.sendMail(mailOptions)
  .then(info => {
    console.log("Mail enviado:", info);
    return info;
  })
  .catch(err => {
    console.error("Error al enviar mail:", err);
  });;

};

export default sendRecoveryEmail;
