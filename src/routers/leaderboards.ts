import { Router } from "express";

const leaderboardsRouter = Router();

leaderboardsRouter.get("/", (req, res) => {
  res.send("Hello World from Leaderboards Router");
});

export default leaderboardsRouter;
