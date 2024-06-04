import { getLeaderboardData } from "./helpers.js";
import { OgPoint } from "./types.js";

export async function getPodium(input: string) {
  // inputDay: 0-3, 0 for total leaderboard, 1-3 for day leaderboard
  let inputDay: number = Number(input);
  let response;
  if (isNaN(+inputDay) || inputDay < 1 || inputDay > 3) {
    inputDay = 0;
  }
  try {
    const data = await getLeaderboardData(inputDay);
    const { top3OG, topHouse } = data;

    let message = ``;
    if (inputDay === 0) {
      message += `*[OVERALL LEADERBOARDS]*\n\n`;
    } else {
      message += `*[DAY ${inputDay} LEADERBOARDS]*\n\n`;
    }

    const ogEmojis: Record<string, string> = {
      Wanderer: "🧭",
      Timeturner: "⏳",
      Changeling: "🪞",
      Healer: "🧪",
    };

    message += `*Winning House*\n`;
    message += `🌟 *${topHouse.name}* (${topHouse.points} points) `;
    message += ogEmojis[topHouse.name] + `\n\n`;

    const rankEmojis: Record<string, string> = {
      1: "🥇",
      2: "🥈",
      3: "🥉",
    };

    message += `*Top 3 OGs:*\n`;
    top3OG.forEach((og: OgPoint, index: number) => {
      message += `${rankEmojis[index + 1]} *OG${og.number}* (${og.points} points)\n`;
    });
    response = message;
  } catch (error) {
    console.error(error);
    response = "Error fetching leaderboard data.";
  }

  return response;
}
