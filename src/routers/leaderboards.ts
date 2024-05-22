import { Router } from "express";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { HousePoints, OgPoints } from "../utils/types.js";

const leaderboardsRouter = Router();

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  "1m-Diq4-lxi4upWPMQfdezh9vLfEucD-f2uCOa3BUA-E",
  serviceAccountAuth,
);

leaderboardsRouter.get("/", async (req, res) => {
  try {
    await doc.loadInfo();
    const sheet1 = doc.sheetsByTitle["" + req.query.date];
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

    res.status(200).json({ top3OG, topHouse });
  } catch (error) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

//TODO - Add time element to retrieve correct sheet according to current date

export default leaderboardsRouter;
