import {Client} from "discord.js";
import { INTENTS } from "./constant";

export const getDiscordClient = async (): Promise<Client> => {
  const bot = new Client({ intents: INTENTS });
  await bot.login(process.env.TEST_DISCORD_TOKEN);
  return bot;
};
