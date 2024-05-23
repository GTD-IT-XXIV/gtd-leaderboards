import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { HousePoints, OgPoints } from "../utils/types.js";
import { env } from "./env.js";

const serviceAccountAuth = new JWT({
  email: env.GOOGLE_CLIENT_EMAIL,
  key: env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(env.SHEETS_ID, serviceAccountAuth);

export async function getLeaderboardData(day?: number) {
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
