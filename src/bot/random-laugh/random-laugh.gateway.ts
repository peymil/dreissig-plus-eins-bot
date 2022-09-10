/* bot.gateway.ts */

import { Injectable } from "@nestjs/common";
import { On, UseGuards } from "@discord-nestjs/core";
import { Message } from "discord.js";
import { RandomLaughService } from "./random-laugh/random-laugh.service";
import { doesIncludesAsSubstring } from "../../utils";
import { InjectRepository } from "@nestjs/typeorm";
import { ChannelEventEntity } from "./entity/ChannelEvent.entity";
import { Repository } from "typeorm";
import { Parser } from "expr-eval";
import {
  wordsToLaugh,
  welcomeWords,
  welcomeReplyWords,
  cumGibiLink,
} from "./constant";

@Injectable()
export class RandomLaughGateway {
  constructor(
    private randomLaughService: RandomLaughService,
    @InjectRepository(ChannelEventEntity)
    private channelEventRepo: Repository<ChannelEventEntity>
  ) {}

  @On("messageCreate")
  async cu(msg: Message) {
    //Create cu event
    const eventName = "cu";

    const cuVictim = await this.channelEventRepo.findOne({
      where: { event_name: eventName, channel_id: msg.channelId },
    });

    //Check if cu event is already initialized and user wrote a message which includes cu as substring
    if (cuVictim) {
      const isCuEventTimedOut =
        (+new Date() - +cuVictim.creation_date) / 60000 >
        parseInt(process.env.CU_EVENT_TIMEOUT_MINUTES);
      if (isCuEventTimedOut) {
        await this.channelEventRepo.delete({
          event_name: eventName,
          channel_id: msg.channelId,
        });
      } else if (doesIncludesAsSubstring(msg.content, "cu")) {
        const jokeSentence = "ANANIN AMCUUUUU";
        await msg.reply(jokeSentence).catch(() => {
          msg.channel.send(jokeSentence);
        });
        await this.channelEventRepo.delete({
          event_name: eventName,
          channel_id: msg.channelId,
        });
      }
    }
    // If cu event is not initialized
    else if (Math.random() < parseInt(process.env.CU_EVENT_CHANCE_PERCANTAGE)) {
      this.channelEventRepo.create({
        event_name: eventName,
        channel_id: msg.channelId,
      });
      msg.channel.send("cu");
    }
  }

  @On("messageCreate")
  laughToHolyNumbers(msg: Message) {
    if (doesIncludesAsSubstring(msg.content, "31"))
      msg.channel.send(this.randomLaughService.generateRandomLaugh(30, 60));
    else {
      try {
        const sum = Parser.parse(msg.content).evaluate();
        if (sum === 31)
          msg.channel.send(this.randomLaughService.generateRandomLaugh(30, 60));
      } catch (err) {
        // The only error that can occur is parser error. If parser fails to parse just end the function
        return;
      }
    }
  }

  @On("messageCreate")
  laughToWords(msg: Message) {
    if (wordsToLaugh.some((word) => doesIncludesAsSubstring(msg.content, word)))
      msg.channel.send(this.randomLaughService.generateRandomLaugh(30, 60));
  }

  @On("messageCreate")
  laughToCum(msg: Message) {
    if (
      doesIncludesAsSubstring(msg.content, "cum") ||
      doesIncludesAsSubstring(msg.content, "kum")
    ) {
      msg.channel.send(cumGibiLink);
    }
  }

  @On("messageCreate")
  async camiMiEvetCamiymis(msg: Message) {
    const eventName = "camiMi";

    const camiMiEvent = await this.channelEventRepo.findOne({
      where: { event_name: eventName, channel_id: msg.channelId },
    });
    const lowerCaseMsg = msg.content.toLowerCase();
    const isWelcomeWordFound = welcomeWords.some((welcomeWord) => {
      return doesIncludesAsSubstring(lowerCaseMsg, welcomeWord);
    });
    if (isWelcomeWordFound) {
      msg.channel.send("Cami mi lan burası");
      if (!camiMiEvent)
        await this.channelEventRepo.create({
          event_name: eventName,
          channel_id: msg.channelId,
        });
    }

    if (camiMiEvent) {
      const lowerCaseMsg = msg.content.toLowerCase();
      const isFound = welcomeReplyWords.some((welcomeReplyWord) => {
        return doesIncludesAsSubstring(lowerCaseMsg, welcomeReplyWord);
      });
      const isCamiMiEventTimedOut =
        (+new Date() - +camiMiEvent.creation_date) / 60000 >
        parseInt(process.env.CU_EVENT_TIMEOUT_MINUTES);
      if (isCamiMiEventTimedOut) {
        await this.channelEventRepo.delete({
          event_name: eventName,
          channel_id: msg.channelId,
        });
      } else if (isFound) {
        msg.channel.send("Camiymiş");
        await this.channelEventRepo.delete({
          event_name: eventName,
          channel_id: msg.channelId,
        });
      }
    }
  }
}
