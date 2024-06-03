import { Telegraf } from "telegraf";

import { env } from "../utils/env.js";
import { getPodium } from "../utils/getPodium.js";

// const bot = new Telegraf(env.BOT_TOKEN);
const bot = new Telegraf(env.BOT_TOKEN);
const password = env.ANNOUNCEMENT_PASSWORD;
let cid = env.CHANNEL_ID;

// Placeholder bot behavior
bot.start((ctx) => ctx.reply("Welcome!"));
bot.hears("hi", (ctx) => ctx.reply("Hello there"));

// 'announce' command to fetch and display leaderboard data
bot.command("announce", async (ctx) => {
  const input = ctx.message.text.split(" ");
  let message = "";

  if (input[1] !== `${password}`) {
    ctx.reply("Invalid password.");
    return;
  }

  try {
    message += await getPodium(input[2]);
    ctx.telegram.sendMessage(cid, message);
  } catch (error) {
    ctx.reply("Error making an announcement.\n" + error);
  }
});

bot.command("help", (ctx) => {
  ctx.reply(
    "Welcome to the GTD XXVI Leaderboards Bot!\nEnter one of the available command to start:\n",
  );
});

bot.command("podium", async (ctx) => {
  const input = ctx.message.text.split(" ");
  let message = "";
  try {
    message += await getPodium(input[1]);
    ctx.reply(message);
  } catch (error) {
    ctx.reply("Error fetching podium.\n" + error);
  }
});

// command to update channel id
bot.command("update", (ctx) => {
  const input = ctx.message.text.split(" ");
  if (input.length < 2) {
    ctx.reply(
      "/update <password> to update broadcast chat to the current group",
    );
    return;
  }
  if (input[1] !== `${password}`) {
    ctx.reply("Invalid password.");
    return;
  }
  cid = Number(ctx.message.chat.id);
  ctx.reply(`Channel ID updated to ${env.CHANNEL_ID}`);
});

export default bot;
