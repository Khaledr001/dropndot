import app from "./app";
import { connectDB } from "./config/db";
import { serverPort } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
  });
};

startServer();
