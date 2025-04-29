Eu fiz esse bot exclusivamente para xingar minha amiga Laly todo santo dia às exatas 18:00, pode contribuir com mais xingamentos para eu adicionar no json

---
Se caso quiser fazer essa graça com seus amigos ta ae um exemplo de .env para colocar na raíz do projeto

```env
BOT_KEY=chave-do-bot
TARGET_CHANNEL_ID=000000000000000
TARGET_USER_ID=0000000000000000
CRON_SCHEDULE=22 20 * * *
```

A cron vc pode usar em qlqr um desses formatos:
```bash
*/5 * * * *	    A cada 5 minutos
0 */1 * * *	    No minuto 0 de cada hora
0 9 * * *	      Todo dia às 9:00 da manhã
30 14 * * 1-5  	Segunda a sexta-feira às 14:30
```
