/* registration.command.ts */

import {
  Command,
  UsePipes,
  Payload,
  DiscordTransformedCommand,
  TransformedCommandExecutionContext,
} from "@discord-nestjs/core";
import { TransformPipe } from "@discord-nestjs/common";
import { Injectable } from "@nestjs/common";
import { ForbidGamesConfigService } from "../config/forbid-games-config.service";
import { RemoveForbiddenGameDto } from "../dto/removeForbiddenGame.dto";

@Command({
  name: "removeforbiddengame",
  description: "Remove a forbidden game",
})
@Injectable()
@UsePipes(TransformPipe)
export class RemoveForbiddenGameCommand
  implements DiscordTransformedCommand<RemoveForbiddenGameDto>
{
  constructor(private forbidGamesConfigService: ForbidGamesConfigService) {}

  async handler(
    @Payload() dto: RemoveForbiddenGameDto,
    { interaction }: TransformedCommandExecutionContext
  ) {
    await this.forbidGamesConfigService.removeForbiddenGame(
      interaction.guildId,
      dto.name
    );
    return `${dto.name} is now not forbidden.}`;
  }
}
