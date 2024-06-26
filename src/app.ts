import cors from "cors";
import express from "express";
import morgan from "morgan";

import bot from "./bot/index.js";
import leaderboardsRouter from "./routers/leaderboards.js";
import { shutdown } from "./utils/config.js";
import { env } from "./utils/env.js";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(await bot.createWebhook({ domain: env.WEBHOOK_DOMAIN }));
app.use("/leaderboards", leaderboardsRouter);

const server = app.listen(env.PORT, () => {
  console.log(`Server is running at port ${env.PORT}`);
});

process.on("SIGTERM", () => shutdown(server));
process.on("SIGINT", () => shutdown(server));
