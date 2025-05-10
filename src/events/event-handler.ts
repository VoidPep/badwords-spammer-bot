import { Client, TextChannel } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();

export abstract class EventHandler {
  static OnStart(client: Client<boolean>) {
    console.log(`Logged in as ${client.user?.tag}!`);

    const TARGET_CHANNEL_ID = `${process.env.TARGET_CHANNEL_ID}`;
    const TARGET_USER_ID = `${process.env.TARGET_USER_ID}`;

    const CRON_SCHEDULE =  process.env.CRON_SCHEDULE ? `${process.env.CRON_SCHEDULE}` : "*/1 * * * *";

    cron.schedule(CRON_SCHEDULE, async () => {
      await EventHandler.xingar(client, TARGET_CHANNEL_ID, TARGET_USER_ID);
    });
  }

    private static async xingar(client: Client<boolean>, TARGET_CHANNEL_ID: string, TARGET_USER_ID: string) {
        try {
            const channel = await client.channels.fetch(TARGET_CHANNEL_ID);

            if (channel?.isTextBased()) {
                const userMention = `<@${TARGET_USER_ID}>`;
                await (channel as TextChannel).send(
                    `${userMention}, ${this.getRandomMessage()}! `
                );
            }
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    }

  static getRandomMessage(): string {
    const xingamentos = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "src/xingamentos.json"), {
        encoding: "utf-8",
      })
    ).palavras as string[];

    const randomIndex = Math.floor(Math.random() * xingamentos.length);
    return xingamentos[randomIndex];
  }
}
