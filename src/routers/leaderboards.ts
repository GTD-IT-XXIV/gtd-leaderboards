import { Router } from "express";
import { z } from "zod";

import {
  getAllLeaderboardData,
  getAllLeaderboardDataByDay,
  getLeaderboardData,
  getLeaderboardDataByDay,
} from "../utils/helpers.js";

const leaderboardsRouter = Router();

leaderboardsRouter.get("/all", async (_req, res) => {
  try {
    const data = await getAllLeaderboardData();
    res.status(200).json(data);
  } catch (_err) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

leaderboardsRouter.get("/all/:day", async (req, res) => {
  try {
    const dayParseResult = z.coerce.number().safeParse(req.params.day);
    const day = dayParseResult.success ? dayParseResult.data : undefined;
    const data = await getAllLeaderboardDataByDay(day);
    res.status(200).json(data);
  } catch (_err) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

leaderboardsRouter.get("/:day", async (req, res) => {
  try {
    const dayParseResult = z.coerce.number().safeParse(req.params.day);
    const day = dayParseResult.success ? dayParseResult.data : undefined;
    const data = await getLeaderboardDataByDay(day);
    res.status(200).json(data);
  } catch (_err) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

leaderboardsRouter.get("/", async (_req, res) => {
  try {
    const data = await getLeaderboardData();
    res.status(200).json(data);
  } catch (_err) {
    res.status(500).send("Error fetching data from spreadsheet");
  }
});

//TODO - Add time element to retrieve correct sheet according to current date

export default leaderboardsRouter;
