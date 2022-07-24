import { Module } from "@nestjs/common";
import { ForbidGamesModule } from "./forbid-games/forbid-games.module";

@Module({
  imports: [ForbidGamesModule],
})
export class BotModule {}
