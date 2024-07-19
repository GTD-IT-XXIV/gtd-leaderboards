import { Telegraf, TelegramError } from "telegraf";
import { Message } from "telegraf/types";

import { env } from "../utils/env.js";
import { getHelp, getPodium } from "../utils/helpers.js";

const bot = new Telegraf(env.BOT_TOKEN);
const password = env.ANNOUNCEMENT_PASSWORD;
let cid = env.CHANNEL_ID;

bot.start(async (ctx) => {
  try {
    await ctx.react("👍");
    try {
      await ctx.telegram.sendMessage(ctx.message.from.id, getHelp(), {
        parse_mode: "Markdown",
      });
    } catch (error) {
      let reply: Message.TextMessage;
      if (error instanceof TelegramError) {
        if (error.response.error_code === 403) {
          reply = await ctx.reply(
            "Please start a chat with me first at @gtd_leaderboards_bot.",
          );
        } else {
          reply = await ctx.reply(
            "A Telegram error occurred while sending message.",
          );
        }
      } else {
        reply = await ctx.reply("An error occurred while sending message.");
      }
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
    }
    await ctx.deleteMessage(ctx.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

bot.command("help", async (ctx) => {
  try {
    await ctx.react("👍");
    try {
      await ctx.telegram.sendMessage(ctx.message.from.id, getHelp(), {
        parse_mode: "Markdown",
      });
    } catch (error) {
      let reply: Message.TextMessage;
      if (error instanceof TelegramError) {
        if (error.response.error_code === 403) {
          reply = await ctx.reply(
            "Please start a chat with me first at @gtd_leaderboards_bot.",
          );
        } else {
          reply = await ctx.reply(
            "A Telegram error occurred while sending message.",
          );
        }
      } else {
        reply = await ctx.reply("An error occurred while sending message.");
      }
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
    }
    await ctx.deleteMessage(ctx.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

bot.command("announce", async (ctx) => {
  try {
    await ctx.react("👍");
    const input = ctx.message.text.split(" ");
    let message = "";

    if (input[1] !== `${password}`) {
      const reply = await ctx.reply("Invalid password.");
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
      return;
    }

    try {
      message += await getPodium(input[2]);
      await ctx.telegram.sendMessage(cid, message, { parse_mode: "Markdown" });
    } catch (error) {
      const reply = await ctx.reply("Error making an announcement.\n" + error);
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
    }
  } catch (error) {
    console.error(error);
  }
});

bot.command("podium", async (ctx) => {
  try {
    await ctx.react("👍");
    const input = ctx.message.text.split(" ");
    let message = "";

    try {
      message += await getPodium(input[1]);
    } catch (error) {
      const reply = await ctx.reply("Error fetching podium.\n" + error);
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
      return;
    }

    try {
      await ctx.telegram.sendMessage(ctx.message.from.id, message, {
        parse_mode: "Markdown",
      });
    } catch (error) {
      let reply: Message.TextMessage;
      if (error instanceof TelegramError) {
        if (error.response.error_code === 403) {
          reply = await ctx.reply(
            "Please start a chat with me first at @gtd_leaderboards_bot.",
          );
        } else {
          reply = await ctx.reply(
            "A Telegram error occurred while sending message.",
          );
        }
      } else {
        reply = await ctx.reply("An error occurred while sending message.");
      }
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
    }
    await ctx.deleteMessage(ctx.message.message_id);
  } catch (error) {
    console.error(error);
  }
});

bot.command("getchannel", async (ctx) => {
  try {
    const reply = await ctx.reply(`Current channel ID: ${ctx.message.chat.id}`);
    await ctx.deleteMessage(ctx.message.message_id);
    setTimeout(() => {
      ctx.deleteMessage(reply.message_id);
    }, 3000);
  } catch (error) {
    console.error(error);
  }
});

bot.command("setchannel", async (ctx) => {
  try {
    const input = ctx.message.text.split(" ");

    // check if password is correct
    if (input[1] !== `${password}`) {
      const reply = await ctx.reply("Invalid password.");
      setTimeout(() => {
        ctx.deleteMessage(reply.message_id);
      }, 3000);
      return;
    }

    try {
      // check if bot has permission to delete messages
      const member = await ctx.getChatAdministrators();
      const admin = member.find((member) => member.user.id === env.BOT_ID);
      if (
        !admin ||
        !("can_delete_messages" in admin) ||
        !admin.can_delete_messages
      ) {
        await ctx.reply(
          "Error: Please grant bot permission to delete messages.",
        );
        return;
      }
    } catch (error) {
      console.warn("Bot is in private chat, skipping permission check.");
    }

    cid = Number(input[2] ?? ctx.message.chat.id);
    await ctx.deleteMessage(ctx.message.message_id);
    const reply = await ctx.reply(
      `Broadcast chat successfully set to current chat.`,
    );
    setTimeout(() => {
      ctx.deleteMessage(reply.message_id);
    }, 3000);
  } catch (error) {
    console.error(error);
  }
});

export default bot;
