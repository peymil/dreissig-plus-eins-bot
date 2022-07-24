import { Param } from "@discord-nestjs/core";


export class AddForbiddenGameDto {
  @Param({ name: "name", description: "Game Name", required: true })
  name: string;

  @Param({
    name: "shouldban",
    description: "Ban user if plays the game",
    required: true,
  })
  shouldban: boolean;
}