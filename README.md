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
    git clone https://github.com/WuenderVoidrel/Sistema_Ia.git
    cd Sistema_Ia
    ```
2.  **Inicie um servidor HTTP:**
    ```bash
    python3 -m http.server 8000
    ```
3.  **Acesse no navegador:** `http://localhost:8000`