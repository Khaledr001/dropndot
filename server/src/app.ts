import express, { Application, NextFunction, Request, Response } from "express";
import { globalMiddlewares } from "./config/settings";
import { userRoute } from "./routes/userRoutes";

const app: Application = express();

app.use(...globalMiddlewares);

// LOG for API
app.use((req: Request, res: Response, next: NextFunction) => {
  res.on("finish", function () {
    console.log(
      req.method,
      req.hostname,
      req.path,
      res.statusCode,
      res.statusMessage,
      new Date(Date.now()).toString()
    );
  });
  next();
});

app.use("/api/v1", userRoute);


export default app;