import { Client, GatewayIntentBits } from 'discord.js';
import { EventHandler } from './events/event-handler';
import dotenv from 'dotenv'; 
import express from 'express';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', async () => {
  EventHandler.OnStart(client);

  setInterval(() => {
    fetch(`${process.env.RENDER_URL}`)
      .then(() => {
        console.log("Ping para manter o render vivo");
      });
  }, 1000 * 60 * 10);
});

console.log(process.env.BOT_KEY)
client.login(`${process.env.BOT_KEY}`);

// ==== SERVIDOR FAKE PARA ABRIR UMA PORTA ====
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Bot está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor web rodando na porta ${PORT}`);
});