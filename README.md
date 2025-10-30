🧠 Projeto – API de Envio de Formulário (MachineFlow IA)

Este projeto é uma API Node.js que recebe dados de um formulário web e envia um e-mail automaticamente usando Gmail SMTP.
O backend está hospedado na Vercel, e o frontend consome o endpoint /api/send via fetch().


---

🚀 Tecnologias utilizadas

Node.js + Express (ou função serverless)

Nodemailer – envio de e-mails via SMTP

Vercel Serverless Functions – hospedagem da API

HTML + JavaScript – formulário de contato

dotenv – gerenciamento de variáveis de ambiente (localmente)



---

📁 Estrutura do projeto

projeto/
├─ .env
├─ index.js
├─ package.json
├─ vercel.json
└─ README.md


---

⚙️ Configuração do .env

Crie um arquivo .env na raiz do projeto com suas credenciais do Gmail:

SMTP_USER=machineflowia@gmail.com
SMTP_PASS=sua_senha_de_aplicativo
RECEIVER_EMAIL=machineflowia@gmail.com

> 💡 Dica: use uma senha de aplicativo do Gmail (não sua senha pessoal).
Para gerar: https://myaccount.google.com/apppasswords




---

🧩 Código principal (index.js)

A API lê as variáveis de ambiente e envia e-mails via SMTP:

const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method Not Allowed" });

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: "Campos obrigatórios ausentes." });

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `Nova solicitação de diagnóstico - ${company || "Pessoa Física"}`,
      text: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company || "N/A"}\n\n${message}`
    });

    res.status(200).json({ success: true, message: "Email enviado com sucesso!" });
  } catch (err) {
    console.error("Erro:", err);
    res.status(500).json({ success: false, message: "Erro ao enviar e-mail." });
  }
};


---

🌍 Configuração do vercel.json

{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/send",
      "dest": "/index.js"
    }
  ]
}


---

🧪 Testando a API localmente

Se quiser rodar localmente (fora da Vercel):

npm install
node index.js

Ou com curl (teste direto):

curl -X POST "http://localhost:3000/api/send" \
-H "Content-Type: application/json" \
-d '{"name":"Kaique","email":"teste@email.com","company":"MachineFlow","message":"Olá!"}'


---

🌐 Usando no Frontend

Formulário HTML envia para a API via JavaScript:

await fetch("https://seu-projeto.vercel.app/api/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, company, message })
});


---