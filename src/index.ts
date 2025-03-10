import express, { Express, Request, Response } from "express";
import { env } from "./configs/env";
import authRouter from "./apps/auth/router";
import userRouter from "./apps/users/router";
import bodyParser from "body-parser";
import { appJob } from "./jobs";

const main = () => {
  const app: Express = express();
  app.use(bodyParser.json())
  const routes = [
    authRouter,
    userRouter,
  ]
  
  routes.forEach((route) => {
    app.use("/api", route)
  })
  
  appJob.startDailyJob();
  
  app.listen(env.port, () => {
    console.log(`[server]: Server is running at http://localhost:${env.port}`);
  });
}

main();
