import { UserTypeEnum } from "../../libs/common/enum";
import datasource from "../../libs/database/datasource";
import { UserRepository } from "./repository";
import { env } from "../../configs/env";
import logger from "../../libs/common/logger";

export class CalculateBalanceJob {
  constructor(
    private readonly userRepository = new UserRepository()
  ) {}

  async calculateMonthlyUsersBalance() {
    logger.info("START CALCULATE MONTHLY BALANCE")
    const queryRunner = (await datasource.getConnection()).createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const totalUsers = env.totalCalculatedUser;
      logger.info("TOTAL USERS", totalUsers)
      const monthlyWorkers = await this.userRepository.getListUserNotUpdatedBalance(queryRunner, UserTypeEnum.MONTHLY, totalUsers);
      if (!monthlyWorkers.length) {
        logger.info("EMPTY MONTHLY WORKERS")
        return;
      }
      await this.userRepository.updateMonthlyUserBalance(queryRunner, monthlyWorkers.map(item => item.id))
      await queryRunner.commitTransaction()
      await this.calculateMonthlyUsersBalance()
      logger.info("CALCULATE MONTHLY BALANCE DONE")
      return;
    } catch (e) {
      logger.error("CALCULATE MONTHLY BALANCE ERROR", e)
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  async calculateDailyUsersBalance() {
    logger.info("START CALCULATE DAILY BALANCE")
    const queryRunner = (await datasource.getConnection()).createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const totalUsers = env.totalCalculatedUser;
      const dailyWorkers = await this.userRepository.getListUserNotUpdatedBalance(queryRunner, UserTypeEnum.DAILY, totalUsers);
      if (!dailyWorkers.length) {
        logger.info("EMPTY DAILY WORKERS")
        return;
      }
      await this.userRepository.updateDailylyUserBalance(queryRunner, dailyWorkers.map(item => item.id))
      await queryRunner.commitTransaction()
      await this.calculateDailyUsersBalance()
      logger.info("CALCULATE DAILY USERS BALANCE DONE")
      return;
    } catch (e) {
      logger.error("ERROR CALCULATE DAILY USERS BALANCE")
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}
