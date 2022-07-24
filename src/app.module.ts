import { DiscordModule } from "@discord-nestjs/core";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Intents } from "discord.js";
import { BotModule } from "./bot/bot.module";
import { TypeOrmModule } from "@nestjs/typeorm";

console.log(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("ORM_HOST"),
        port: configService.get("ORM_PORT"),
        username: configService.get("ORM_USERNAME"),
        password: configService.get("ORM_PASSWORD"),
        database: configService.get("ORM_DATABASE"),
        entities: [__dirname + "/**/*.entity.js"],
        synchronize: true,
      }),
    }),
    DiscordModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get("DISCORD_TOKEN"),
        discordClientOptions: {
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES],
        },
        registerCommandOptions: [
          {
            forGuild: configService.get("GUILD_ID_WITH_COMMANDS"),
            removeCommandsBefore: true,
          },
        ],
      }),
    }),
    BotModule,
  ],
})
export class AppModule {}
