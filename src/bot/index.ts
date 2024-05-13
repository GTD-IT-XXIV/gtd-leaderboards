import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { env } from "../utils/env.js";

const bot = new Telegraf(env.BOT_TOKEN);

// Placeholder bot behavior
bot.start((ctx) => ctx.reply("Welcome!"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hello there"));

export default bot;
