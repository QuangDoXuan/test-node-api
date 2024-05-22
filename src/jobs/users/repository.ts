import { User } from "../../libs/database/entities/user";
import { AbstractRepository } from "../../libs/database/abstracts/abstract-repository";
import { Brackets, QueryRunner } from "typeorm";
import { UserTypeEnum } from "../../libs/common/enum";

export class UserRepository extends AbstractRepository<User> {
  getListUserNotUpdatedBalance(queryRunner: QueryRunner, userType: UserTypeEnum, total: number) {
    return queryRunner.manager.createQueryBuilder(User, "users")
    .where("users.userType = :userType", { userType })
    .andWhere(
      new Brackets((qb) => {
        qb.andWhere("DATE(users.updatedBalanceAt) <> CURDATE()")
        .orWhere('users.updatedBalanceAt IS NULL')
    }))
    .orderBy("users.updatedBalanceAt", "ASC")
    .limit(total)
    .getMany()
  }

  updateMonthlyUserBalance(queryRunner: QueryRunner, userIds: number[]) {
    return queryRunner.manager.createQueryBuilder()
    .update(User)
    .set({ 
        balance: () => "(base_salary / 30) * days_worked",
        updatedBalanceAt: () => "NOW()"
    })
    .where("id IN (:...userIds)", { userIds })
    .andWhere("user_type = :userType", { userType: UserTypeEnum.MONTHLY })
    .execute()
  }

  updateDailylyUserBalance(queryRunner: QueryRunner, userIds: number[]) {
    return queryRunner.manager.createQueryBuilder()
    .update(User)
    .set({ 
        balance: () => "daily_rate * days_worked",
        updatedBalanceAt: () => "NOW()"
    })
    .where("id IN (:...userIds)", { userIds })
    .andWhere("user_type = :userType", { userType: UserTypeEnum.DAILY })
    .execute()
  }
}