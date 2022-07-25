import { Module } from "@nestjs/common";
import { RandomLaughService } from "./random-laugh/random-laugh.service";
import { RandomLaughGateway } from "./random-laugh.gateway";

@Module({
  providers: [RandomLaughService, RandomLaughGateway],
})
export class RandomLaughModule {}
