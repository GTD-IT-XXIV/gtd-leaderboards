import axios from "axios";
import { Telegraf } from "telegraf";

import { env } from "../utils/env.js";
import { OgPoint } from "../utils/types.js";

const bot = new Telegraf(env.BOT_TOKEN);

// Placeholder bot behavior
bot.start((ctx) => ctx.reply("Welcome!"));
bot.hears("hi", (ctx) => ctx.reply("Hello there"));

// 'announce' command to fetch and display leaderboard data
bot.command("announce", async (ctx) => {
  try {
    const response = await axios.get("http://localhost:8080/leaderboards");
    const { top3OG, topHouse } = response.data;

    let message = `Top 3 OGs:\n`;
    top3OG.forEach((og: OgPoint, index: number) => {
      message += `${index + 1}. OG${og.number}, Points: ${og.points}\n`;
    });
    message += `\nTop House:\n${topHouse.name}, Points: ${topHouse.points}`;

    ctx.reply(message);
  } catch (error) {
    console.error(error);
    ctx.reply("Error fetching leaderboard data.");
  }
});

//TODO - Add feature for bot to announce leaderboard data to GTD BIG FAM group
//TODO - Add feature for bot to announce at specific times throughout the day (?)

export default bot;
