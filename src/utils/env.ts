import { createEnv } from "@t3-oss/env-core";
import "dotenv/config";
import { z } from "zod";

import { PORT } from "./config.js";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BOT_TOKEN: z.string(),
    WEBHOOK_DOMAIN: z.string().url().default(`http://localhost:${PORT}`),
    GOOGLE_CLIENT_EMAIL: z.string(),
    GOOGLE_PRIVATE_KEY: z.string(),
    SHEETS_ID: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
