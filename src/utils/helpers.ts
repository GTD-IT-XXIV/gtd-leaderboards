import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { descriptions } from "./descriptions.js";
import { env } from "./env.js";
import {
  AllLeaderboardData,
  HousePoints,
  OgPoint,
  OgPoints,
  TopLeaderboardData,
} from "./types.js";

const serviceAccountAuth = new JWT({
  email: env.GOOGLE_CLIENT_EMAIL,
  key: env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(env.SHEETS_ID, serviceAccountAuth);

export async function getLeaderboardDataByDay(day?: number) {
  await doc.loadInfo();
  const sheet1 =
    doc.sheetsByTitle[!!day && day >= 1 && day <= 3 ? `Day ${day}` : "Total"];
  await sheet1.loadHeaderRow(2);
  const rows1 = await sheet1.getRows({ limit: 10 });

  const OG: OgPoints = rows1.slice(0, 8).map((row) => ({
    number: row.get("OG"),
    points: +row.get("OG Points"),
  }));

  const House: HousePoints = rows1
    .filter((_, index) => index % 2 === 0)
    .slice(0, 4)
    .map((row) => ({
      name: row.get("House"),
      points: +row.get("House Points"),
    }));

  const top3OG = OG.sort((a, b) => b.points - a.points).slice(0, 3);
  const topHouse = House.sort((a, b) => b.points - a.points)[0];

  return { top3OG, topHouse };
}

export async function getLeaderboardData() {
  const allData: TopLeaderboardData = {};
  for (let day = 1; day <= 3; day++) {
    allData[day] = await getLeaderboardDataByDay(day);
  }
  allData.overall = await getLeaderboardDataByDay();
  return allData;
}

export async function getAllLeaderboardDataByDay(day?: number) {
  await doc.loadInfo();
  const sheet1 =
    doc.sheetsByTitle[!!day && day >= 1 && day <= 3 ? `Day ${day}` : "Total"];
  await sheet1.loadHeaderRow(2);
  const rows1 = await sheet1.getRows({ limit: 10 });

  const OG: OgPoints = rows1.slice(0, 8).map((row) => ({
    number: row.get("OG"),
    points: +row.get("OG Points"),
  }));

  const House: HousePoints = rows1
    .filter((_, index) => index % 2 === 0)
    .slice(0, 4)
    .map((row) => ({
      name: row.get("House"),
      points: +row.get("House Points"),
    }));

  const topOG = OG.sort((a, b) => b.points - a.points);
  const topHouse = House.sort((a, b) => b.points - a.points);

  return { topOG, topHouse };
}

export async function getAllLeaderboardData() {
  const allData: AllLeaderboardData = {};
  for (let day = 1; day <= 3; day++) {
    allData[day] = await getAllLeaderboardDataByDay(day);
  }
  allData.overall = await getAllLeaderboardDataByDay();
  return allData;
}

export async function getPodium(input: string) {
  // inputDay: 0-3, 0 for total leaderboard, 1-3 for day leaderboard
  let inputDay: number = Number(input);
  let response;
  if (isNaN(+inputDay) || inputDay < 1 || inputDay > 3) {
    inputDay = 0;
  }
  try {
    const data = await getLeaderboardDataByDay(inputDay);
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

export function getHelp() {
  let message: string = "";
  for (const key in descriptions) {
    message += `${descriptions[key]}\n`;
  }
  return message;
}
