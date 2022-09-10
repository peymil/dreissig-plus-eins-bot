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
    const forbiddenActivities =
      await this.forbidGamesService.getForbiddenActivities(
        newPresence.activities,
        newPresence.guild.id
      );
    if (!forbiddenActivities) return;
    const newActivities =
      await this.forbidGamesService.processUserActivitiesAndGetNewActivities(
        forbiddenActivities,
        newPresence.user,
        newPresence.guild.id
      );
    console.log("newActivities", newActivities);
    if (!newActivities) return;

    this.forbidGamesService.answerToUser(
      newActivities,
      newPresence.user.username,
      newPresence.guild.systemChannel
    );
  }
}
