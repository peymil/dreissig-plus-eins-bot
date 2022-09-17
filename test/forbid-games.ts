import { getDiscordClient } from "./getDiscordClient";
import discord, { AnyChannel, Message, TextChannel } from "discord.js";
import { getTestChannel } from "./getTestChannel";

describe("forbid-games", () => {
  let testBot: discord.Client;
  let testChannel: TextChannel;
  beforeAll(async () => {
    testBot = await getDiscordClient();
    testChannel = await getTestChannel(testBot);
  });

});