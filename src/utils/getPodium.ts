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
      message += `Total Leaderboard so far:\n\n`;
    } else {
      message += `Leaderboard for Day ${inputDay}:\n\n`;
    }
    message += `Top 3 OGs:\n`;
    top3OG.forEach((og: OgPoint, index: number) => {
      message += `${index + 1}. OG${og.number}, Points: ${og.points}\n`;
    });
    message += `\nTop House:\n${topHouse.name}, Points: ${topHouse.points}`;
    response = message;
  } catch (error) {
    console.error(error);
    response = "Error fetching leaderboard data.";
  }

  return response;
}
