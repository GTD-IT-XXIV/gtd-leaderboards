import { Router } from "express";
import { z } from "zod";

import { getLeaderboardData } from "../utils/helpers.js";

const leaderboardsRouter = Router();

leaderboardsRouter.get("/", async (req, res) => {
  try {
    const dayParseResult = z.coerce.number().safeParse(req.query.day);
    const day = dayParseResult.success ? dayParseResult.data : undefined;
    const data = await getLeaderboardData(day);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

//TODO - Add time element to retrieve correct sheet according to current date

export default leaderboardsRouter;
