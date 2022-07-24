import { Module } from "@nestjs/common";
import { ForbidGamesService } from "./forbid-games.service";
import { AddForbiddenGameCommand } from "./command/addForbiddenGame.command";
import { RemoveForbiddenGameCommand } from "./command/removeForbiddenGame.command";
import { ForbidGamesConfigService } from "./config/forbid-games-config.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ForbidGamesMessageEntity } from "./config/entity/forbid-games-message.entity";
import { GameEntity } from "./config/entity/game.entity";
import { ActivityEntity } from "./entity/activity.entity";
import { ForbidGamesConfigEntity } from "./config/entity/forbid-games-config.entity";
import { DiscordModule } from "@discord-nestjs/core";
import { ForbidGamesGateway } from "./forbid-games.gateway";

@Module({
  imports: [
    DiscordModule.forFeature(),
    TypeOrmModule.forFeature([
      GameEntity,
      ForbidGamesMessageEntity,
      ActivityEntity,
      ForbidGamesConfigEntity,
    ]),
  ],
  providers: [
    ForbidGamesService,
    ForbidGamesConfigService,
    AddForbiddenGameCommand,
    RemoveForbiddenGameCommand,
    ForbidGamesGateway,
  ],
})
export class ForbidGamesModule {}
