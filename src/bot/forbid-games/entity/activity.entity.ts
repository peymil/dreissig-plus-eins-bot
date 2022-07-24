import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { GameEntity } from "../config/entity/game.entity";

@Entity()
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ nullable: true })
  latestPresenceUpdate: Date;

  @Column()
  totalPlayTime: number;

  @OneToOne(() => GameEntity)
  @JoinColumn()
  game: GameEntity;
}
