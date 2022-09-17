import { Client, TextChannel } from "discord.js";

export const getTestChannel = async (client: Client): Promise<TextChannel> => {
  return client.channels.fetch(
    process.env.TEST_CHANNEL
  ) as Promise<TextChannel>;
};
