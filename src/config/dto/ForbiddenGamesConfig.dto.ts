import { IsNotEmpty, IsString } from "class-validator";

export class ForbiddenGamesConfigDto {
  @IsNotEmpty({ message: "forbiddenGames must be not empty", each: true })
  @IsString({ message: "forbiddenGames must be a string", each: true })
  forbiddenGames: string[];
}
