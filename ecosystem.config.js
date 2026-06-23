/**
 * PM2 — Gabriel Mello Portfolio (produção)
 *
 * Deploy na VPS:
 *   1. cp .env.example .env   # e preencha RESEND_API_KEY
 *   2. npm ci
 *   3. npm run build
 *   4. pm2 start ecosystem.config.js
 *   5. pm2 save                # persiste entre reboots
 *   6. pm2 startup             # (uma vez) gera o serviço de boot
 *
 * Atualizar depois de um git pull:
 *   npm ci && npm run build && pm2 reload portfolio
 *
 * A app sobe na porta 3002 (3000 e 3001 já são usadas por outro serviço).
 * O Cloudflare Tunnel aponta gabriel-mello.com -> http://127.0.0.1:3002.
 */
module.exports = {
  apps: [
    {
      name: 'portfolio',
      cwd: __dirname,
      // chama o binário do Next diretamente (mais confiável que "npm start" no PM2)
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3002',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: '3002',
      },
      // logs com timestamp (padrão do PM2: ~/.pm2/logs · veja com `pm2 logs portfolio`)
      time: true,
    },
  ],
};
