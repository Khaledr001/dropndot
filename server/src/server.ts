import app from "./app";
import { connectDB } from "./config/db";
import { serverPort } from "./config/env";

const startServer = async () => {
  // Establish database connection
  await connectDB();

  // Start the server
  app.listen(serverPort, () => {
    console.log(`Server is running on port ${serverPort}`);
  });
};

startServer();
