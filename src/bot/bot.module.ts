import { Module } from "@nestjs/common";
import { ForbidGamesModule } from "./forbid-games/forbid-games.module";
import { RandomLaughGateway } from "./random-laugh/random-laugh.gateway";

@Module({
  imports: [ForbidGamesModule],
  providers: [RandomLaughGateway],
})
export class BotModule {}
