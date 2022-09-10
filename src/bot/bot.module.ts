import { Module } from "@nestjs/common";
import { ForbidGamesModule } from "./forbid-games/forbid-games.module";
import { RandomLaughModule } from "./random-laugh/random-laugh.module";

@Module({
  imports: [ForbidGamesModule, RandomLaughModule],
  providers: [],
})
export class BotModule {}
