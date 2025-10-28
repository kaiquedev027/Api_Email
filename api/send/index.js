// index.js (Vercel serverless handler)
const nodemailer = require("nodemailer");
// require('dotenv').config(); // habilite localmente se for testar com .env

module.exports = async (req, res) => {
  // --- CORS (ajuste o origin em produção se quiser restringir) ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");

  // Log para debug (apague em produção)
  console.log("METHOD:", req.method);
  console.log("HEADERS:", req.headers);

  // Responde preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Aceita apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, company, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Campos obrigatórios ausentes." });
  }

  // Variáveis de ambiente (no Vercel: Settings -> Environment Variables)
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const RECEIVER = process.env.RECEIVER_EMAIL;
  if (!SMTP_USER || !SMTP_PASS || !RECEIVER) {
    console.error("Missing SMTP env vars");
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
      subject: `Nova solicitação de diagnóstico - ${company || "Pessoa Física"}`,
      text: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company || "N/A"}\n\n${message}`
    });

    return res.status(200).json({ success: true, message: "Email enviado com sucesso." });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return res.status(500).json({ success: false, message: "Erro ao enviar email." });
  }
};
