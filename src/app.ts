import cors from "cors";
import express from "express";

import bot from "./bot/index.js";
import leaderboardsRouter from "./routers/leaderboards.js";
import { env } from "./utils/env.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(await bot.createWebhook({ domain: env.WEBHOOK_DOMAIN }));
app.use("/leaderboards", leaderboardsRouter);

app.listen(env.PORT, () => {
  console.log(`Server is running at port ${env.PORT}`);
});
