🧠 Projeto – API Email Envio de Formulário (MachineFlow IA)

Este projeto é uma API Node.js que recebe dados de um formulário web e envia um e-mail automaticamente usando Gmail SMTP.
O backend está hospedado na Vercel, e o frontend consome o endpoint /api/send via fetch().


---

🚀 Tecnologias utilizadas

Node.js + Express (ou função serverless)

Nodemailer – envio de e-mails via SMTP

Vercel Serverless Functions – hospedagem da API

HTML + JavaScript – formulário de contato

dotenv – gerenciamento de variáveis de ambiente (localmente)

## 🚀 Como Executar (Localmente)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/kaiquedev027/Api_Email.git
    cd Api_Email
    ```
2.  **Baixe as dependencias:**
    ```bash
    npm init
    npm install express  nodemailer  cors  body-parser  dotenv
    ```
2.  **Cole ao final do codigo do index.js:**
    ```bash
    const PORT = process.env.PORT || 3000;
    const HOST = "0.0.0.0"; 

    app.listen(PORT, HOST, () => {
    console.log(`🚀 Server rodando em http://${HOST}:${PORT}`);
    });
    ```
2.  **Inicie um servidor HTTP:**
    ```bash
    node index.js
    ```
3.  **Acesse no navegador:** `http://localhost:3000`
