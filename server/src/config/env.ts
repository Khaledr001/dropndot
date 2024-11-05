import { config } from "dotenv";

config({
  path: `.env`,
  override: true,
});

const DB_URL = process.env.DATABASE_URL;
const serverPort = process.env.PORT || "6101";

export { DB_URL, serverPort };