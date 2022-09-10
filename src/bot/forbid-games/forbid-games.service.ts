import { Injectable } from "@nestjs/common";
import { ForbidGamesConfigService } from "./config/forbid-games-config.service";
import { Activity, TextChannel, User } from "discord.js";
import { Repository } from "typeorm";
import { ActivityEntity } from "./entity/activity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GameEntity } from "./config/entity/game.entity";

@Injectable()
export class ForbidGamesService {
  constructor(
    private forbidGamesConfigService: ForbidGamesConfigService,
    @InjectRepository(ActivityEntity)
    private activityRepo: Repository<ActivityEntity>,
    @InjectRepository(GameEntity)
    private gameEntityRepo: Repository<GameEntity>
  ) {}

  async getForbiddenActivities(
    activities: Activity[],
    guildId: string
  ): Promise<Activity[] | undefined> {
    const forbiddenActivities =
      await this.forbidGamesConfigService.getForbiddenGameNames(guildId);
    const foundForbiddenActivities: Activity[] = [];
    for (const activity of activities) {
      if (forbiddenActivities.includes(activity.name)) {
        foundForbiddenActivities.push(activity);
      }
    }
    if (foundForbiddenActivities.length > 0) {
      return activities;
    }
    return undefined;
  }

  async processUserActivitiesAndGetNewActivities(
    activities: Activity[],
    user: User,
    guildId: string
  ): Promise<ActivityEntity[]> {
    for (const activity of activities) {
      const newActivities: ActivityEntity[] = [];
      const activityStart = activity.timestamps.start;
      const activityEnd = activity.timestamps.end;
      const game = await this.gameEntityRepo.findOne({
        where: { guildId, name: activity.name },
      });
      const foundActivity = await this.activityRepo.findOne({
        where: { userId: user.id, game },
      });
      if (!foundActivity) {
        const newActivityEntity = new ActivityEntity();
        newActivityEntity.userId = user.id;
        newActivityEntity.game = game;
        if (activityStart && activityEnd) {
          newActivityEntity.totalPlayTime = +activityEnd - +activityStart;
        } else if (activityStart) {
          newActivityEntity.totalPlayTime = +new Date() - +activityStart;
          newActivityEntity.latestPresenceUpdate = new Date();
        }
        newActivities.push(await this.activityRepo.save(newActivityEntity));
      } else {
        await this.activityRepo.update(
          {
            userId: user.id,
            game,
          },
          {
            totalPlayTime: +new Date() - +foundActivity.latestPresenceUpdate,
            latestPresenceUpdate: new Date(),
          }
        );
      }
      return newActivities;
    }
  }

  parseResponseTemplate(response: string, user: string, game: string) {
    return response.replace("@u@", `<@${user}>`);
  }

  async answerToUser(
    activities: ActivityEntity[],
    userId: string,
    channel: TextChannel
  ) {
    for (const activity of activities) {
      const text = this.parseResponseTemplate(
        this.forbidGamesConfigService.getDefaultResponse(activity.game.name),
        userId,
        activity.game.name
      );
      await channel.send(text);
    }
  }
}
