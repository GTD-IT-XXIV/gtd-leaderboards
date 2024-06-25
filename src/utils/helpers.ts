import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import {
  AllLeaderboardData,
  HousePoints,
  OgPoints,
  TopLeaderboardData,
} from "../utils/types.js";
import { env } from "./env.js";

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
