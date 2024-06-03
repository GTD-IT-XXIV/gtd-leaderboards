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
bot.command("update", async (ctx) => {
  const input = ctx.message.text.split(" ");
  if (input[1] !== `${password}`) {
    ctx.reply("Invalid password.");
    return;
  }

  const member = await ctx.getChatAdministrators();
  const admin = member.find((member) => member.user.id === env.BOT_ID);
  if (
    admin &&
    "can_delete_messages" in admin &&
    admin.can_delete_messages === false
  ) {
    ctx.reply("Error: Please grant bot permission to delete messages.");
    return;
  }

  cid = Number(ctx.message.chat.id);
  ctx.deleteMessage(ctx.message.message_id);
  ctx.reply(`Broadcast chat successfully set to current chat.`);
});

export default bot;
