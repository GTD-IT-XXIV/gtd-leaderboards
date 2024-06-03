import { createEnv } from "@t3-oss/env-core";
import "dotenv/config";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(8080),
    BOT_ID: z.coerce.number(),
    BOT_TOKEN: z.string(),
    WEBHOOK_DOMAIN: z.string().url(),
    GOOGLE_CLIENT_EMAIL: z.string(),
    GOOGLE_PRIVATE_KEY: z.string(),
    SHEETS_ID: z.string(),
    CHANNEL_ID: z.coerce.number(),
    ANNOUNCEMENT_PASSWORD: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
