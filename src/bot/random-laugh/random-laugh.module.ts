import { Module } from "@nestjs/common";
import { RandomLaughService } from "./random-laugh/random-laugh.service";
import { RandomLaughGateway } from "./random-laugh.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelEventEntity } from "./entity/ChannelEvent.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChannelEventEntity])],
  providers: [RandomLaughService, RandomLaughGateway],
})
export class RandomLaughModule {}
