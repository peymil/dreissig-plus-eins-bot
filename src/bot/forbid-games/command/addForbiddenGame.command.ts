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
import { AddForbiddenGameDto } from "../dto/addForbiddenGame.dto";
import { ForbidGamesConfigService } from "../config/forbid-games-config.service";

@Command({
  name: "addforbiddengame",
  description: "Add a new forbidden game.",
})
@Injectable()
@UsePipes(TransformPipe)
export class AddForbiddenGameCommand
  implements DiscordTransformedCommand<AddForbiddenGameDto>
{
  constructor(private forbidGamesConfigService: ForbidGamesConfigService) {}

  async handler(
    @Payload() dto: AddForbiddenGameDto,
    { interaction }: TransformedCommandExecutionContext
  ): Promise<string> {
    await this.forbidGamesConfigService.addForbiddenGame(
      interaction.guildId,
      dto.name,
      dto.shouldban
    );
    return `${dto.name} is now forbidden. ${
      dto.shouldban ? "You will be banned if you play it." : ""
    }`;
  }
}
