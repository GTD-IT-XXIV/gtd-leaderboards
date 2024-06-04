import { Telegraf } from "telegraf";

import { descriptions } from "../utils/descriptions.js";
import { env } from "../utils/env.js";
import { getPodium } from "../utils/getPodium.js";

const bot = new Telegraf(env.BOT_TOKEN);
const password = env.ANNOUNCEMENT_PASSWORD;
let cid = env.CHANNEL_ID;

bot.command("help", (ctx) => {
  let message: string = "";
  for (const key in descriptions) {
    message += `${descriptions[key]}\n`;
  }
  ctx.reply(message);
});

bot.command("announce", async (ctx) => {
  const input = ctx.message.text.split(" ");
  let message = "";

  if (input[1] !== `${password}`) {
    ctx.reply("Invalid password.");
    return;
  }

  try {
    message += await getPodium(input[2]);
    ctx.telegram.sendMessage(cid, message, { parse_mode: "Markdown" });
  } catch (error) {
    ctx.reply("Error making an announcement.\n" + error);
  }
});

bot.command("podium", async (ctx) => {
  const input = ctx.message.text.split(" ");
  let message = "";

  try {
    message += await getPodium(input[1]);
    ctx.telegram.sendMessage(ctx.message.from.id, message, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    ctx.reply("Error fetching podium.\n" + error);
  }
});

bot.command("setchannel", async (ctx) => {
  const input = ctx.message.text.split(" ");

  // check if password is correct
  if (input[1] !== `${password}`) {
    ctx.reply("Invalid password.");
    return;
  }

  // check if bot has permission to delete messages
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
