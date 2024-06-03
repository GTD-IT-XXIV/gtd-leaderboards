import { Telegraf } from "telegraf";

import { env } from "../utils/env.js";
import { getPodium } from "../utils/getPodium.js";

const bot = new Telegraf(env.BOT_TOKEN);

// Placeholder bot behavior
bot.start((ctx) => ctx.reply("Welcome!"));
bot.hears("hi", (ctx) => ctx.reply("Hello there"));

// 'announce' command to fetch and display leaderboard data
bot.command("announce", async (ctx) => {
  const input = ctx.message.text.split(" ");
  let message = "";
  try {
    message += await getPodium(input);
    ctx.telegram.sendMessage(env.CHANNEL_ID, message);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching leaderboard data.");
    console.log(input);
  }
});

bot.command("help", (ctx) => {
  ctx.reply(
    "Welcome to the GTD XXVI Leaderboards Bot!\nEnter one of the available command to start:\n",
  );
});

bot.command("podium", (ctx) => {
  ctx.reply("Please enter the password to access the podium data.");
});

//TODO - Add feature for bot to announce at specific times throughout the day (?)

export default bot;
