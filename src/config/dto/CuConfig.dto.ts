import { IsNumber, Max, Min } from "class-validator";

export class CuConfigDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  CU_EVENT_OCCUR_PERCANTAGE: number;

}