import { Client, GatewayIntentBits } from 'discord.js';
import { EventHandler } from './events/event-handler';
import dotenv from 'dotenv'; 
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', async () => {
  EventHandler.OnStart(client);
});

client.login(`${process.env.BOT_KEY}`);