import { Router } from "express";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

import { HousePoints, OgPoints } from "../utils/types.js";

const leaderboardsRouter = Router();

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
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
    await doc.loadInfo(); // loads document properties and worksheets
    const sheet1 = doc.sheetsByTitle["Day 1"];
    await sheet1.loadHeaderRow(2); // set row 2 for header values
    const rows1 = await sheet1.getRows({ limit: 10 });

    const OG: OgPoints = Array.from({ length: 8 }, () => ({
      number: "",
      points: 0,
    }));
    for (let i = 0; i < 8; i++) {
      OG[i].number = rows1[i].get("OG");
      OG[i].points = rows1[i].get("OG Points");
    }

    const House: HousePoints = Array.from({ length: 4 }, () => ({
      name: "",
      points: 0,
    }));
    for (let i = 0; i < 4; i++) {
      House[i].name = rows1[i * 2].get("House");
      House[i].points = rows1[i * 2].get("House Points");
    }

    OG.sort((a, b) => b.points - a.points);
    House.sort((a, b) => b.points - a.points);

    const top3OG = OG.slice(0, 3);
    const topHouse = House[0];

    res.status(200).json({ top3OG, topHouse });
  } catch (error) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

//TODO - Add time element to retrieve correct sheet according to current date

export default leaderboardsRouter;
