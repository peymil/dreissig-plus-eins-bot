import { IsString, IsNotEmpty } from "class-validator";
import { CuConfigDto } from "./CuConfig.dto";
import { ForbiddenGamesConfigDto } from "./ForbiddenGamesConfig.dto";

export class BaseConfigDto {
  @IsString()
  @IsNotEmpty({ message: "botToken must be not empty" })
  botToken: string;

  cu = CuConfigDto;
  forbiddenGames = ForbiddenGamesConfigDto;
}