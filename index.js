// index.js
const nodemailer = require("nodemailer");

// NÃO chame dotenv aqui em produção no Vercel (ele usa variáveis do painel).
// Mas para testes locais, você pode habilitar dotenv:
// require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Campos obrigatórios ausentes." });
  }

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

    const info = await transporter.sendMail({
      from: `"${name}" <${SMTP_USER}>`,
      to: RECEIVER,
      replyTo: email,
      subject: `Nova solicitação de diagnóstico - ${company || "Pessoa Física"}`,
      html: `
        <h3>Nova solicitação de diagnóstico</h3>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email do cliente:</strong> ${escapeHtml(email)}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(company || "N/A")}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `
    });

    console.log("Email enviado, messageId:", info.messageId);
    return res.status(200).json({ success: true, message: "Email enviado com sucesso." });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    return res.status(500).json({ success: false, message: "Erro ao enviar email." });
  }
};

function escapeHtml(unsafe) {
  if (!unsafe) return "";
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
