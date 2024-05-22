import { CalculateBalanceJob } from "./users/calculate-user-balance";
import cron from "node-cron";
import logger from "../libs/common/logger";
export class AppJob {
  constructor(
    private readonly userBalanceJob = new CalculateBalanceJob()
  ) {}

  startDailyJob() {
    cron.schedule("* * * * *", async () => {
      logger.info('STARTING DAILY JOB CALCULATING USER BALANCE')
      await Promise.all([
        this.userBalanceJob.calculateMonthlyUsersBalance(),
        this.userBalanceJob.calculateDailyUsersBalance()
      ])
      logger.info('END DAILY JOB CALCULATING USER BALANCE')
    });
  }
}


export const appJob = new AppJob()