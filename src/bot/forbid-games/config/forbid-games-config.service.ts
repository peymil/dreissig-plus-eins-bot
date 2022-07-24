import { Injectable } from "@nestjs/common";
import { ForbidGamesConfigEntity } from "./entity/forbid-games-config.entity";
import { GameEntity } from "./entity/game.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ForbidGamesConfigService {
  @InjectRepository(ForbidGamesConfigEntity)
  forbidGamesConfigRepo: Repository<ForbidGamesConfigEntity>;
  @InjectRepository(GameEntity) gameRepo: Repository<GameEntity>;

  /**
   * Returns the forbidden games for a guild.
   * A little bit expensive use checkIfGameIsForbidden.
   * @param guildId
   */

  async getForbiddenGames(guildId: string): Promise<GameEntity[]> {
    const games = this.gameRepo.find({ where: { guildId } });
    return games;
  }

  getDefaultResponse() {
    return "@g@ OYUNCUSU TESPİT EDİLDİ!!! @g@ OYUNCUSU TESPİT EDİLDİ!!! @u@";
  }

  async getForbiddenGameNames(guildId: string): Promise<string[]> {
    return this.gameRepo
      .find({ where: { guildId } })
      .then((game) => game.map((game) => game.name));
  }

  async addForbiddenGame(
    guildId: string,
    gameName: string,
    shouldBan: boolean
  ): Promise<GameEntity> {
    const game = await this.gameRepo.findOne({
      where: { name: gameName, guildId },
    });
    if (game) {
      throw new Error("Game already exists");
    }
    const gameEntity = new GameEntity();
    gameEntity.name = gameName;
    gameEntity.guildId = guildId;
    gameEntity.disabled = false;
    gameEntity.shouldBan = shouldBan;
    return this.gameRepo.save(gameEntity);
  }

  async removeForbiddenGame(guildId: string, gameName: string): Promise<void> {
    const game = await this.gameRepo.delete({ name: gameName, guildId });
  }
}
