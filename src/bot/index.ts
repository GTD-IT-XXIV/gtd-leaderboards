import { Telegraf } from "telegraf";

import { env } from "../utils/env.js";
import { getLeaderboardData } from "../utils/helpers.js";
import { OgPoint } from "../utils/types.js";

const bot = new Telegraf(env.BOT_TOKEN);
const password = env.ANNOUNCEMENT_PASSWORD;

// Placeholder bot behavior
bot.start((ctx) => ctx.reply("Welcome!"));
bot.hears("hi", (ctx) => ctx.reply("Hello there"));

// 'announce' command to fetch and display leaderboard data
bot.command("announce", async (ctx) => {
  const input = ctx.message.text.split(" ");
  if (input[1] !== `${password}`) {
    ctx.reply("Invalid password.");
    return;
  } else if (input.length >= 3) {
    let inputDay: number | undefined;
    if (input[2].toLowerCase() === "day") {
      inputDay = Number(input[3]);
    } else if (input[2].toLowerCase() === "total") {
      // undefined means total leaderboard points
      inputDay = undefined;
    }
    try {
      const response = await getLeaderboardData(inputDay);
      const { top3OG, topHouse } = response;

      let message = ``;
      if (inputDay === undefined) {
        message += `Total Leaderboard so far:\n\n`;
      } else {
        message += `Leaderboard for Day ${inputDay}:\n\n`;
      }
      message += `Top 3 OGs:\n`;
      top3OG.forEach((og: OgPoint, index: number) => {
        message += `${index + 1}. OG${og.number}, Points: ${og.points}\n`;
      });
      message += `\nTop House:\n${topHouse.name}, Points: ${topHouse.points}`;

      ctx.telegram.sendMessage(env.CHANNEL_ID, message);
    } catch (error) {
      console.error(error);
      ctx.reply("Error fetching leaderboard data.");
      console.log(input);
    }
  } else {
    console.log(input);
  }
});

//TODO - Add feature for bot to announce at specific times throughout the day (?)

export default bot;
