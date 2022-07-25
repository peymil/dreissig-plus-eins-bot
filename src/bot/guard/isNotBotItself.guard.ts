/* message-from-user.guard.ts */

import { DiscordGuard } from "@discord-nestjs/core";
import { Message } from "discord.js";

export class IsNotBotItselfGuard implements DiscordGuard {
  canActive(event: "messageCreate", [message]: [Message]): boolean {
    return message.author.id === message.client.user.id;
  }
}
