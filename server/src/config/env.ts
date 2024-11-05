import { config } from "dotenv";

// Configure env file path
config({
  path: `.env`,
  override: true,
});

const DB_URL = process.env.DATABASE_URL;
const serverPort = process.env.PORT || "6101";

export { DB_URL, serverPort };