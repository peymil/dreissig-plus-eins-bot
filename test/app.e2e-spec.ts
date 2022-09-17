import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Test } from "@nestjs/testing";
import { getDiscordClient } from "./getDiscordClient";
import { getTestChannel } from "./getTestChannel";
import discord, { TextChannel } from "discord.js";

describe("Cats", () => {
  let app: INestApplication;
  let testBot: discord.Client;
  let testChannel: TextChannel;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    testBot = await getDiscordClient();
    testChannel = await getTestChannel(testBot);
    app = moduleRef.createNestApplication();
    await app.init();
  }, 20000);
  // it("should not allow games", async () => {
  //   expect.assertions(1);
  //   testChannel.send({ content: "/addforbiddengame VALORANT False" });
  //   await testChannel.awaitMessages({ max: 1 });
  //   await testBot.user.setActivity({ name: "VALORANT" });
  // }, 10000);

  it("should laugh to normal 31", async () => {
    expect.assertions(1);
    const msgsPromise = testChannel.awaitMessages({ max: 2 });
    testChannel.send({ content: "31" });
    const msgs = await msgsPromise;
    console.log("msgs", msgs);
    expect(msgs.size).toEqual(2);
  }, 10000);

  it("should not laugh to numbers that includes 31", async () => {
    expect.assertions(1);
    const msgsPromise = testChannel.awaitMessages({ max: 1 });
    await testChannel.send({ content: "31245" });
    const msgs = await msgsPromise;
    expect(msgs.size).toEqual(1);
  }, 10000);

  it("should laugh to basic arithmetical operations that equals to 31", async () => {
    expect.assertions(1);
    const msgsPromise = testChannel.awaitMessages({ max: 8 });
    await testChannel.send({ content: "15+16" });
    await testChannel.send({ content: "32-1" });
    await testChannel.send({ content: "62/2" });
    await testChannel.send({ content: "16*2-1" });
    const msgs = await msgsPromise;
    expect(msgs.size).toEqual(8);
  }, 10000);

  afterAll(async () => {
    await app.close();
  });
});
