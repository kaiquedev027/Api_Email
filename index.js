// index.js
const nodemailer = require("nodemailer");

// require('dotenv').config(); // habilite localmente se usar .env

module.exports = async (req, res) => {
  // Permitir CORS (ajuste origins conforme necessidade)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  // Responder preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Campos obrigatórios ausentes." });
  }

  // Lê variáveis de ambiente (defina no Vercel)
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const RECEIVER = process.env.RECEIVER_EMAIL;

  if (!SMTP_USER || !SMTP_PASS || !RECEIVER) {
    console.error("Faltam variáveis de ambiente de SMTP");
    return res.status(500).json({ success: false, message: "Configuração de e-mail ausente." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: RECEIVER,
      replyTo: email,
      subject: `Nova solicitação - ${company || "Pessoa Física"}`,
      text: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company || "N/A"}\n\n${message}`
    });

    return res.status(200).json({ success: true, message: "Email enviado com sucesso." });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return res.status(500).json({ success: false, message: "Erro ao enviar email." });
  }
};
