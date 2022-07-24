import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  guildId: string;

  @Column()
  name: string;

  @Column()
  disabled: boolean;

  @Column()
  shouldBan: boolean;
}