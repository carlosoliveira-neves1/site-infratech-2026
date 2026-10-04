# Site Infratech — versão Netlify

Site institucional da Infratech, preparado para publicar na Netlify a partir do GitHub.

- Páginas: arquivos `.html` na raiz, com estilos e scripts em `assets/`.
- Assistente do chat: `netlify/functions/chat.mjs`, publicado em `/api/chat`. Usa o Google Gemini.
- Formulário de contato: usa o Netlify Forms. As mensagens aparecem no painel da Netlify.

## Publicar

1. Na Netlify: **Add new site › Import an existing project › GitHub** e escolha este repositório.
2. Deixe as configurações de build como vieram (o `netlify.toml` já define tudo) e clique em **Deploy**.
3. Em **Site configuration › Environment variables**, crie a variável:
   - `GEMINI_API_KEY` = a chave gerada em https://aistudio.google.com
4. Faça um novo deploy (**Deploys › Trigger deploy**) para a chave passar a valer.

Variáveis opcionais: `GEMINI_MODELO` (padrão `gemini-3.5-flash`), `GEMINI_RESERVA` (modelos reserva separados por vírgula, padrão `gemini-3.5-flash-lite`) e `WHATSAPP` (padrão `5511986489257`).

A Netlify encerra a função do chat em 10 segundos no plano grátis, por isso os modelos padrão são os mais rápidos. Se trocar o modelo, prefira um que responda em poucos segundos.

## Formulários

Em **Forms**, ative a detecção de formulários (Enable form detection) e faça um novo deploy. Depois aparecem dois formulários:

- `contato`: mensagens do formulário da página Contato.
- `lead-chat`: visitantes que o assistente encaminhou para o WhatsApp, com o resumo e a conversa.

Para receber cada mensagem por e-mail: **Forms › Form notifications › Add notification › Email notification**.

## Segurança

A chave do Gemini **nunca** deve ser colocada nos arquivos do repositório. Ela fica só nas variáveis de ambiente da Netlify.
