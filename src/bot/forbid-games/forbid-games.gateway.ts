/* bot.gateway.ts */

import { Injectable } from "@nestjs/common";
import { On } from "@discord-nestjs/core";
import { Presence } from "discord.js";
import { ForbidGamesService } from "./forbid-games.service";

@Injectable()
export class ForbidGamesGateway {
  constructor(private forbidGamesService: ForbidGamesService) {}

  @On("presenceUpdate")
  async listenGameEvents(
    oldPresence: Presence,
    newPresence: Presence
  ): Promise<void> {
    console.log("oldPresence", oldPresence);
    console.log("newPresence", newPresence);
    const forbiddenActivities =
      await this.forbidGamesService.getForbiddenActivities(
        newPresence.activities,
        newPresence.guild.id
      );

    const newActivities =
      await this.forbidGamesService.processUserActivitiesAndGetNewActivities(
        forbiddenActivities,
        newPresence.user,
        newPresence.guild.id
      );

    this.forbidGamesService.answerToUser(
      newActivities,
      newPresence.user.username,
      newPresence.guild.systemChannel
    );
  }
}
