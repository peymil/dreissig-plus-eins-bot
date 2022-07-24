import { Param } from "@discord-nestjs/core";

export class RemoveForbiddenGameDto {
  @Param({ name: "name", description: "Game Name", required: true })
  name: string;
}
