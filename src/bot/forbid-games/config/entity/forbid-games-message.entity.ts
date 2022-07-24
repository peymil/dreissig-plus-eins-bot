import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class ForbidGamesMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ unique: true })
  gameId: number;

  @Column()
  message: string;
}