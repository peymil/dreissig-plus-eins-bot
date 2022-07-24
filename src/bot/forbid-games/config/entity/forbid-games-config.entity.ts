import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class ForbidGamesConfigEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  guildId: string;

  @Column()
  shouldDisableByDefault: boolean;

  @Column()
  shouldBanByDefault: boolean;
}